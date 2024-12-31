import { motion } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

type AnimatedProgressProps = React.ComponentProps<typeof Progress> & {
  value: number
  max?: number
}

export function AnimatedProgress({ value, max = 100, ...props }: AnimatedProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <Progress {...props}>
      <motion.div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${percentage}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </Progress>
  )
}

