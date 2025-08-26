import { Button } from '@renderer/features/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/features/ui/tooltip'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

interface CopyButtonProps {
  text: string
  content: string
  className?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, content, className }) => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>{text}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={className}
            onClick={() => {
              navigator.clipboard.writeText(content)
              setIsCopied(true)
            }}
          >
            {isCopied ? <CheckIcon className="h-4 w-4" /> : <ClipboardIcon className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
