"use client"

import { useEffect, useRef } from "react"

// ShipSafe cursor — green glowing scan dot + ring matching the security theme
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.body.style.cursor = "none"

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number

    const DOT_R = 3   // half of 6px
    const RING_R = 15 // half of 30px

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => { hoverRef.current = true }
    const onLeave = () => { hoverRef.current = false }

    const attachListeners = () => {
      document.querySelectorAll<Element>("a, button, [role='button'], input, textarea, select, label")
        .forEach(el => {
          el.addEventListener("mouseenter", onEnter)
          el.addEventListener("mouseleave", onLeave)
        })
    }

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    attachListeners()

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      ringX = lerp(ringX, mouseX, 0.11)
      ringY = lerp(ringY, mouseY, 0.11)

      const isHover = hoverRef.current

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - DOT_R}px, ${mouseY - DOT_R}px) scale(${isHover ? 1.5 : 1})`
        dotRef.current.style.boxShadow = isHover
          ? "0 0 10px #3fb950, 0 0 24px rgba(63,185,80,0.6)"
          : "0 0 6px #3fb950, 0 0 16px rgba(63,185,80,0.35)"
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - RING_R}px, ${ringY - RING_R}px) scale(${isHover ? 1.6 : 1})`
        ringRef.current.style.opacity = isHover ? "0.6" : "1"
        ringRef.current.style.borderColor = isHover ? "rgba(63,185,80,0.9)" : "rgba(63,185,80,0.55)"
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.body.style.cursor = ""
    }
  }, [])

  return (
    <>
      {/* Green glow dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#3fb950",
          boxShadow: "0 0 6px #3fb950, 0 0 16px rgba(63,185,80,0.35)",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
          transition: "transform 0.1s, box-shadow 0.2s",
        }}
      />
      {/* Green ring — trails */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(63,185,80,0.55)",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          transition: "opacity 0.25s, border-color 0.2s",
        }}
      />
    </>
  )
}
