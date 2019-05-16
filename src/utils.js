const dateformat = require(`dateformat`)

exports.buildPath = ({ title }) => {
  // const date = new Date(createdAt)
  // const formattedDate = dateformat(date, `yyyy-mm-dd`)

  // remove special chars
  let cleantitle = title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
  // change hyphen for space
  let slug = cleantitle.replace(/\s+/g, '-')
  return `/${slug}`
}
