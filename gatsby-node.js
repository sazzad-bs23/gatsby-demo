const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

//   const fetchUsers = () => axios.get('https://randomuser.me/api/?results=500', {
//         method: 'GET'
//     }).then(res => {
//         const hUsers = Object.keys(res.data).map((row,i) => {
//             const userNode = {
//                 id: res.data[row].id,
//                 parent: `__SOURCE__`,
//                 internal: {
//                     type: 'RandomUser',
//                 },
//                 children: [],
//                 gender: res.data[row].gender,
//                 name: {
//                     title: res.data[row].name.title,
//                     first: res.data[row].name.first,
//                     last: res.data[row].name.last,
//                 },
//                 picture: {
//                     large: res.data[row].picture.large,
//                     medium: res.data[row].picture.medium,
//                     thumbnail: res.data[row].picture.thumbnail,
//                 }
//             };
//             const contentDigest = crypto
//                 .createHash('md5')
//                 .update(JSON.stringify(userNode))
//                 .digest('hex');
//             userNode.internal.contentDigest = contentDigest;
//             createNode(userNode);
//         });
//     });

  // fetch raw data from the randomuser api
  const fetchRandomUser = () => axios.get(`https://randomuser.me/api/?results=500`);
  // await for results
  const res = await fetchRandomUser();

  // map into these results and create nodes
  res.data.results.map((user, i) => {
    // Create your node object
    const userNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `RandomUser`, // name of the graphQL query --> allRandomUser {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      gender: user.gender,
      name: {
        title: user.name.title,
        first: user.name.first,
        last: user.name.last,
      },
      picture: {
        large: user.picture.large,
        medium: user.picture.medium,
        thumbnail: user.picture.thumbnail,
      }
      // etc...
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode))
      .digest(`hex`);
    // add it to userNode
    userNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(userNode);
  });

//   const fetchGlpgTag = () => axios.get(`https://www-dev.galapagoshealth.com/bin/public/glpg/tags?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiZ2xwZy1oY3Bwb3J0YWwiLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.DznkEz_nhq4qGbLPwjxy-NHOj4YKk68WB2-qsxoK4Y8`);
//   const res2 = await fetchGlpgTag();
//   res2.data.results.map((tags, i) => {
//     const userNode = {
//       id: `${i}`,
//       parent: `__SOURCE__`,
//       internal: {
//         type: `GlpgTag`,
//       },
//       children: [],

//       tag_id: tags.tag_id,
//       value: tags.value,
//       title: tags.title
//     }

//     const contentDigest = crypto
//       .createHash(`md5`)
//       .update(JSON.stringify(userNode))
//       .digest(`hex`);
//     userNode.internal.contentDigest = contentDigest;
    
//     createNode(userNode);
//   });

  return Promise.all([fetchRandomUser()]);
}