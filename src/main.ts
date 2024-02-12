import { Application, Container, Graphics } from 'pixi.js'
import './style.css'

const app = new Application({
  resizeTo: window,
  resolution: devicePixelRatio,
  background: 0xffffff
})

const width = app.screen.width // devicePixelRatio
const height = app.screen.height // devicePixelRatio
const cloudsContainer = new Container()

class Clouds extends Graphics {
  #x: number
  #y: number
  #z: number
  constructor (x: number, y: number, z: number) {
    super()
    this.#x = x
    this.#y = y
    this.#z = z

    this.beginFill(0)
    for (let i = 0; i !== 100; i++) {
      const rad = Math.random() * Math.PI * 2
      const r = width * (Math.random() * (2 - 0.3) + 0.3)
      this.drawCircle(
        Math.cos(rad) * r,
        Math.sin(rad) * r,
        50
      )
    }
  }
  update () {
    super.x = this.#x / this.#z
    super.y = this.#y / this.#y
    const size = 100 / this.#z
    super.scale.set(size, size)
    this.alpha = this.#z / 3000
    if (this.#z < 0) {
      this.destroy()
    }
  }
  set z (v: number) {
    this.update()
    this.#z = v
  }
  get z () {
    return this.#z
  }
}

cloudsContainer.x = width / 2
cloudsContainer.y = height / 2

app.stage.addChild(cloudsContainer)
const step = () => {
  //cloudsContainer.addChild(new Clouds(0, 40, 100))
  cloudsContainer.addChild(new Clouds(0, 40, 10000))

  for (const clouds of cloudsContainer.children as Clouds[]) {
    clouds.z -= 50
  }
  requestAnimationFrame(step)
}
step()
document.body.append(app.view as HTMLCanvasElement)
