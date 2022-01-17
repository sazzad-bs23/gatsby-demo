import React from "react"
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const TagsPage = (props) => {
    // const tags = props.data.allTags.edges;
    const chars = props.data.allLettersYaml.edges;
    const { t } = useTranslation("translation");

    return (
        <Layout pageTitle={t('GLPG tags')}>
          {
            // tags.map((tag, i) => {
            //     const tagData = tag.node;
            //     return (
            //       <div key={i}>
            //         <p>Tag ID: {tagData.tag_id}</p>
            //         <p>Title: {tagData.title}</p>
            //         <p>Value: {tagData.value}</p>
            //       </div>
            //     )
            // })
            chars.map((char, i) => {
              const charData = char.node;
              return (
                <div key={i}>
                  <p>Character: {charData.character}</p>
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
    allLettersYaml {
      edges {
        node {
          character
        }
      }
    }
  }
`

export default TagsPage