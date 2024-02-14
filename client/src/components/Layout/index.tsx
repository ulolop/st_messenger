interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = props => {
  const { children } = props
  return <div className="layout">{children}</div>
}

export default Layout
