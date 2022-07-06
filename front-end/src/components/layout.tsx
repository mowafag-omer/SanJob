import Nav from "./nav"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}

export default Layout