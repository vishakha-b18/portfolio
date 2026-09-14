import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const VERT = `
  uniform float uTime;
  uniform float uSize;
  attribute float aHue;
  varying float vHue;
  varying float vElev;
  void main() {
    vec3 p = position;
    float e =
      sin(p.x * 0.9 + uTime) * 0.45 +
      cos(p.y * 0.7 + uTime * 0.8) * 0.45 +
      sin((p.x + p.y) * 0.5 - uTime * 0.6) * 0.30 +
      sin(p.x * 2.1 - uTime * 1.3) * 0.12;
    p.z += e;
    vElev = e;
    vHue = aHue;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = `
  precision mediump float;
  uniform vec3 cA;
  uniform vec3 cB;
  uniform vec3 cC;
  uniform float uOpacity;
  varying float vHue;
  varying float vElev;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * uOpacity;
    vec3 col = mix(cA, cB, smoothstep(0.0, 0.5, vHue));
    col = mix(col, cC, smoothstep(0.5, 1.0, vHue));
    col -= abs(vElev) * 0.12;
    gl_FragColor = vec4(col, alpha);
  }
`

export default function HeroWave() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 100)
    camera.position.set(0, 3.4, 6.5)
    camera.lookAt(0, -0.6, -1)

    // grid of points laid flat, receding into the distance
    const GX = 460, GY = 200
    const SPAN_X = 46, SPAN_Y = 20
    const count = GX * GY
    const positions = new Float32Array(count * 3)
    const hues = new Float32Array(count)
    let i = 0
    for (let y = 0; y < GY; y++) {
      for (let x = 0; x < GX; x++) {
        const px = (x / (GX - 1) - 0.5) * SPAN_X
        const py = (y / (GY - 1) - 0.5) * SPAN_Y
        positions[i * 3] = px
        positions[i * 3 + 1] = py
        positions[i * 3 + 2] = 0
        hues[i] = x / (GX - 1)
        i++
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aHue', new THREE.BufferAttribute(hues, 1))

    // Light page: normal blending at low opacity keeps the wave a faint texture.
    // Additive blending, as on the old dark theme, washes out to white here.
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 22 },
        uOpacity: { value: 0.32 },
        cA: { value: new THREE.Color(0x6366f1) },
        cB: { value: new THREE.Color(0x0ea5e9) },
        cC: { value: new THREE.Color(0x8b5cf6) },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const points = new THREE.Points(geo, mat)
    points.rotation.x = -Math.PI / 2.35
    scene.add(points)

    function resize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    let raf = 0
    const start = performance.now()
    function frame() {
      const t = (performance.now() - start) / 1000
      mat.uniforms.uTime.value = t * 0.5
      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }
    if (reduce) {
      mat.uniforms.uTime.value = 1.2
      renderer.render(scene, camera)
    } else {
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="hero-wave" aria-hidden="true" />
}
