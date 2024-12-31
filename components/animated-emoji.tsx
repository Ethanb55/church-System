import { motion } from 'framer-motion'

type AnimatedEmojiProps = {
  emoji: string
}

export function AnimatedEmoji({ emoji }: AnimatedEmojiProps) {
  return (
    <motion.span
      key={emoji}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
      className="inline-block ml-1"
    >
      {emoji}
    </motion.span>
  )
}

