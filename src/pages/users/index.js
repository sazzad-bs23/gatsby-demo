import React from "react"
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const UsersPage = (props) => {
    const users = props.data.allRandomUser.edges;
    const { t } = useTranslation("translation");

    return (
        <Layout pageTitle={t('Our Users')}>
          {
            users.map((user, i) => {
                const userData = user.node;
                return (
                  <div key={i}>
                    <p>Name: {userData.name.first}</p>
                    <p>Gender: {userData.gender}</p>
                    <img src={userData.picture.medium} />
                  </div>
                )
            })
          }
        </Layout>
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
    allRandomUser(limit: 10) {
      edges {
        node {
          name {
            first
            last
            title
          }
          picture {
            large
            medium
            thumbnail
          }
          gender
        }
      }
    }
  }
`

export default UsersPage