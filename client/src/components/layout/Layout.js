import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet"
import { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,keywords,author}) => {
    //  only props val can be passed in argument for children
  return (
    <div>
        <Helmet>
            <meta charSet='utf-8' />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <title>{title}</title>
        </Helmet>
        <Header />
        <main style={{minHeight:"67.7vh"}}>
            {children}
            <Toaster />
            {/* {props.children} */}
        </main>
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
    title:'Ecommerce App - shop now',
    description:"mern stack project",
    keywords:"mern,react,node,mongodb",
    author:"Nen Patel"
}

export default Layout