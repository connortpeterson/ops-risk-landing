import {
  ShieldCheckIcon,
  ViewfinderCircleIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

interface SiteLogoProps {
  icon?: 'shield' | 'target' | 'audit'
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap: Record<Required<SiteLogoProps>['size'], { text: string; icon: string }> = {
  sm: { text: 'text-2xl md:text-3xl', icon: 'h-6 w-6' },
  md: { text: 'text-3xl md:text-4xl', icon: 'h-8 w-8' },
  lg: { text: 'text-4xl md:text-5xl', icon: 'h-10 w-10' },
}

function SiteLogo({ icon, size = 'md' }: SiteLogoProps) {
  const IconComponent =
    icon === 'shield'
      ? ShieldCheckIcon
      : icon === 'target'
        ? ViewfinderCircleIcon
        : icon === 'audit'
          ? DocumentMagnifyingGlassIcon
          : null

  const classes = sizeMap[size]

  return (
    <div
      className={`flex items-center space-x-2 text-slate-900 dark:text-white font-mono font-bold ${classes.text}`}
    >
      {IconComponent && (
        <IconComponent className={`${classes.icon}`} aria-hidden="true" />
      )}
      <span>ExecutionIntel</span>
    </div>
  )
}

export default SiteLogo
