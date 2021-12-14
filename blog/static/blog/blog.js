class Greeter {
  constructor (name) {
    this.name = name
  }
  
  getGreeting(){
    if (this.name === undefined){
      return 'Hello, no name'
    }
    return 'Hello, ' + this.name
  }
  
  showGreeting(greetingMessage) {
    console.log(greetingMessage)
  }
  
  greet() {
    this.showGreeting(this.getGreeting())
  }
}

class DelayedGreeter extends Greeter {
  delay = 2000
  
  constructor (name, delay){
    super(name)
    if (delay !== undefined) {
      this.delay = delay
    }
  }
  
  greet(){
    setTimeout(
    () => {
      this.showGreeting(this.getGreeting())
    }, this.delay
    )
  }
  
}


const g = new Greeter('Centos')
g.greet()

const dg2 = new DelayedGreeter('Centos with 2 seconds')
dg2.greet()

const dg1 = new DelayedGreeter('Centos with 4 seconds', 1000)
dg1.greet()


