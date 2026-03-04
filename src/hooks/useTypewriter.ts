import { useEffect, useMemo, useState } from 'react'

type Options = {
  typingMs?: number
  deletingMs?: number
  holdMs?: number
}

export function useTypewriter(words: string[], options: Options = {}) {
  const typingMs = options.typingMs ?? 56
  const deletingMs = options.deletingMs ?? 28
  const holdMs = options.holdMs ?? 900

  const safeWords = useMemo(() => words.filter(Boolean), [words])
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (safeWords.length === 0) return

    const current = safeWords[wordIndex % safeWords.length]
    const doneTyping = text === current
    const doneDeleting = text.length === 0

    const stepMs = isDeleting ? deletingMs : typingMs
    const nextDelay = doneTyping && !isDeleting ? holdMs : stepMs

    const t = window.setTimeout(() => {
      if (!isDeleting) {
        if (doneTyping) {
          setIsDeleting(true)
          return
        }
        setText(current.slice(0, text.length + 1))
        return
      }

      if (doneDeleting) {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % safeWords.length)
        return
      }
      setText((v) => v.slice(0, Math.max(0, v.length - 1)))
    }, nextDelay)

    return () => window.clearTimeout(t)
  }, [deletingMs, holdMs, isDeleting, safeWords, text, typingMs, wordIndex])

  return text
}
