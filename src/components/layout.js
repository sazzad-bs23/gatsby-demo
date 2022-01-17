import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from './layout.module.css'
import {Link, useI18next, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import { isLoggedIn, logOut } from '../services/auth';
import Cookies from 'js-cookie'

Cookies.set('userId', 'bs001234')

const Layout = ({ pageTitle, children }) => {
  
  isLoggedIn();

  const {languages, originalPath} = useI18next();
  const { t } = useTranslation("translation");

  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <div className={container}>
      <title>{pageTitle} | {t('My First Gatsby Site')}</title>
      <header className={siteTitle}>{t('My First Gatsby Site')}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              <Trans>home</Trans>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              <Trans>about</Trans>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/blog" className={navLinkText}>
              <Trans>blog</Trans>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/users" className={navLinkText}>
              <Trans>users</Trans>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/glpg" className={navLinkText}>
              <Trans>tags</Trans>
            </Link>
          </li>
          <li className={navLinkItem}>
            <a href="#" onClick={logOut}>Logout</a>
          </li>
        </ul>
        <ul className="languages">
          {languages.map((lng) => (
            <li key={lng}>
              <Link to={originalPath} language={lng}>
                {lng}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default Layout
