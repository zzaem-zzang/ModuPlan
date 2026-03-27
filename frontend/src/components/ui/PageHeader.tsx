type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="section-copy">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h1 className="section-title">{title}</h1>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}
