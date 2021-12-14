

class ClickButton extends React.Component {
  state = {
    wasClicked: false
  }

  handleClick () {
    this.setState(
      {wasClicked: true}
    )
  }

  render () {
    let buttonText

    if (this.state.wasClicked)
      buttonText = 'Clicked!'
    else
      buttonText = 'Click Me'

    return <button
      className="btn btn-primary mt-2"
      onClick={
        () => {
          this.handleClick()
        }
      }
    >
      {buttonText}
    </button>
  }
}

class PostRow extends React.Component {
  render() {
    const post = this.props.post
    let thumbnail
    if (post.hero_image.thumbnail){
      thumbnail = <img src={post.hero_image.thumbnail}/>
    } else {
      thumbnail = '-'
    }
    
    return <tr>
        <td>{post.title}</td>
        <td>{thumbnail}</td>
        <td>{post.tags.join(', ')}</td>
        <td>{post.slug}</td>
        <td>{post.summary}</td>
        <td><a href={'/post/' + post.slug + '/'}>View</a></td>
      </tr>     
  }
}

class PostTable extends React.Component {
  state = {
    dataLoaded: false,
    data: null
  }
  
  componentDidMount(){
    fetch(this.props.url).then(response => {
      if(response.status !== 200){
        throw new Error('Invalid status from srcerver: ' + response.statusText)
      }
      return response.json()
    }).then(data => {
      this.setState({
        dataLoaded: true,
        data: data
      })
    }).catch(e => {
      console.error(e)
      this.setState({
        dataLoaded: true,
        data: {results: []}
      })
    })
  }
  
  render(){
    let rows
    if (this.state.dataLoaded){
      if(this.state.data.results.length){
        rows = this.state.data.results.map(post => <PostRow post={post} key={post.id}/>)
      } else {
        rows = <tr><td colSpan="6">No rosults found.</td></tr>
      }
    } else {
      rows = <tr><td colSpan="6">Loading&hellip;</td></tr>
    }
    
    return <table className="table table-striped table-bordered mt-2">
        <thead>
        <tr>
          <th>Title</th>
          <th>Image</th>
          <th>Tags</th>
          <th>Slug</th>
          <th>Summary</th>
          <th>Link</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table> 
  }
}


const domContainer = document.getElementById('react_root')
ReactDOM.render(
  React.createElement(PostTable, {url: postListUrl}),
  domContainer
)