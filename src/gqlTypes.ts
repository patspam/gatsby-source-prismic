import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLJSON,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'gatsby/graphql'

const gql = (query: TemplateStringsArray) => String(query).replace(`\n`, ` `)

export const PrismicStructuredTextType = new GraphQLObjectType({
  name: 'PrismicStructuredTextType',
  description: 'A text field with formatting options.',
  fields: {
    html: {
      type: GraphQLString,
      description:
        'The HTML value of the text using `prismic-dom` and the HTML serializer.',
    },
    text: {
      type: GraphQLString,
      description: 'The plain text value of the text using `prismic-dom`.',
    },
    raw: {
      type: GraphQLJSON,
      description:
        "The field's value without transformations exactly as it comes from the Prismic API.",
    },
  },
})

export const PrismicGeoPointType = new GraphQLObjectType({
  name: 'PrismicGeoPointType',
  description: 'A field for storing geo-coordinates.',
  fields: {
    latitude: {
      type: GraphQLFloat,
      description: 'The latitude value of the geo-coordinate.',
    },
    longitude: {
      type: GraphQLFloat,
      description: 'The latitude value of the geo-coordinate.',
    },
  },
})

export const PrismicEmbedType = new GraphQLObjectType({
  name: 'PrismicEmbedType',
  description: 'Embed videos, songs, tweets, slices, etc.',
  fields: {
    author_id: {
      type: GraphQLID,
      description: 'The ID of the resource author. Fetched via oEmbed data.',
    },
    author_name: {
      type: GraphQLString,
      description:
        'The name of the author/owner of the resource. Fetched via oEmbed data.',
    },
    author_url: {
      type: GraphQLString,
      description:
        'A URL for the author/owner of the resource. Fetched via oEmbed data.',
    },
    cache_age: {
      type: GraphQLString,
      description:
        'The suggested cache lifetime for this resource, in seconds. Consumers may choose to use this value or not. Fetched via oEmbed data.',
    },
    embed_url: { type: GraphQLString, description: 'The URL of the resource.' },
    html: {
      type: GraphQLString,
      description:
        'The HTML required to display the resource. The HTML should have no padding or margins. Consumers may wish to load the HTML in an off-domain iframe to avoid XSS vulnerabilities. Fetched via oEmbed data.',
    },
    name: { type: GraphQLString, description: 'The name of the resource.' },
    provider_name: {
      type: GraphQLString,
      description:
        'The name of the resource provider. Fetched via oEmbed data.',
    },
    provider_url: {
      type: GraphQLString,
      description: 'The URL of the resource provider. Fetched via oEmbed data.',
    },
    thumbnail_height: {
      type: GraphQLInt,
      description:
        "The width of the resource's thumbnail. Fetched via oEmbed data.",
    },
    thumbnail_url: {
      type: GraphQLString,
      description:
        'A URL to a thumbnail image representing the resource. Fetched via oEmbed data.',
    },
    thumbnail_width: {
      type: GraphQLInt,
      description:
        "The width of the resource's thumbnail. Fetched via oEmbed data.",
    },
    title: {
      type: GraphQLString,
      description:
        'A text title, describing the resource. Fetched via oEmbed data.',
    },
    type: {
      type: GraphQLString,
      description: 'The resource type. Fetched via oEmbed data.',
    },
    version: { type: GraphQLString, description: 'The oEmbed version number.' },
    url: {
      type: GraphQLString,
      description: 'The source URL of the resource. Fetched via oEmbed data.',
    },
    width: {
      type: GraphQLInt,
      description:
        'The width in pixel of the resource. Fetched via oEmbed data.',
    },
    height: {
      type: GraphQLInt,
      description:
        'The height in pixel of the resource. Fetched via oEmbed data.',
    },
    media_id: {
      type: GraphQLID,
      description: 'The ID of the resource media. Fetched via oEmbed data.',
    },
  },
})

export const PrismicImageDimensionsType = new GraphQLObjectType({
  name: 'PrismicImageDimensionsType',
  description: 'Dimensions for images.',
  fields: {
    width: { type: GraphQLInt, description: 'Width of the image in pixels.' },
    height: { type: GraphQLInt, description: 'Height of the image in pixels.' },
  },
})

export const PrismicImageThumbnailType = new GraphQLObjectType({
  name: 'PrismicImageThumbnailType',
  description: 'An image thumbnail with constraints.',
  fields: {
    alt: { type: GraphQLString, description: '' },
    copyright: { type: GraphQLString, description: '' },
    dimensions: { type: PrismicImageDimensionsType, description: '' },
    url: { type: GraphQLString, description: '' },
    localFile: {
      type: 'File',
      description: '',
      extensions: { link: true },
    },
  },
})

export const PrismicImageType = new GraphQLObjectType({
  name: 'PrismicImageType',
  description: 'An image field with optional constrained thumbnails.',
  fields: {
    alt: { type: GraphQLString, description: '' },
    copyright: { type: GraphQLString, description: '' },
    dimensions: { type: PrismicImageDimensionsType, description: '' },
    url: { type: GraphQLString, description: '' },
    localFile: {
      type: 'File',
      description: '',
      extensions: { link: true },
    },
    thumbnails: {
      type: PrismicImageThumbnailsType,
      description: "The image's thumbnails.",
    },
  },
})

export const PrismicLinkTypes = new GraphQLEnumType({
  name: 'PrismicLinkTypes',
  description: 'Types of links.',
  values: {
    Any: {},
    Document: {},
    Media: {},
    Web: {},
  },
})

export const PrismicLinkType = new GraphQLObjectType({
  name: 'PrismicLinkType',
  description: 'Link to web, media, and internal content.',
  fields: {
    link_type: {
      type: new GraphQLNonNull(PrismicLinkTypes),
      description: 'The type of link.',
    },
    isBroken: {
      type: GraphQLBoolean,
      description:
        'If a Document link, `true` if linked document does not exist, `false` otherwise.',
    },
    url: {
      type: GraphQLString,
      description: "The document's URL derived via the link resolver.",
    },
    target: { type: GraphQLString, description: "The link's target." },
    size: {
      type: GraphQLInt,
      description: 'If a Media link, the size of the file.',
    },
    id: {
      type: GraphQLID,
      description: "If a Document link, the linked document's Prismic ID.",
    },
    type: {
      type: GraphQLString,
      description:
        "If a Document link, the linked document's Prismic custom type API ID",
    },
    tags: {
      type: GraphQLString,
      description: "If a Document link, the linked document's list of tags.",
    },
    lang: {
      type: GraphQLString,
      description: "If a Document link, the linked document's language.",
    },
    slug: {
      type: GraphQLString,
      description: "If a Document link, the linked document's slug.",
    },
    uid: {
      type: GraphQLString,
      description: "If a Document link, the linked document's UID.",
    },
    document: {
      type: PrismicAllDocumentTypes,
      description: 'If a Document link, the linked document.',
      extensions: { link: true },
    },
    raw: {
      type: GraphQLJSON,
      description:
        "The field's value without transformations exactly as it comes from the Prismic API.",
    },
  },
})

export const types = gql`
  interface PrismicSliceType {
    "The slice type API ID."
    slice_type: String!

    "The slice label."
    slice_label: String
  }

  interface PrismicImageInterface {
    "The image's alternative text."
    alt: String
    "The image's copyright text."
    copyright: String
    "The image's dimensions."
    dimensions: PrismicImageDimensionsType
    "The image's URL on Prismic's CDN."
    url: String
    "The locally downloaded image if \`shouldNormalizeImage\` returns true."
    localFile: File
  }

  interface PrismicDocument {
    "The document's data object without transformations exactly as it comes from the Prismic API."
    dataRaw: JSON!
    "The document's data object without transformations. The object is stringified via \`JSON.stringify\` to eliminate the need to declare subfields."
    dataString: String
      @deprecated(reason: "Use \`dataRaw\` instead which returns JSON.")
    "The document's initial publication date."
    first_publication_date(
      "Format the date using Moment.js' date tokens, e.g. \`date(formatString: \\"YYYY MMMM DD\\")\`. See https://momentjs.com/docs/#/displaying/format/ for documentation for different tokens."
      formatString: String
      "Returns a string generated with Moment.js' \`fromNow\` function"
      fromNow: Boolean
      "Returns the difference between this date and the current time. Defaults to \\"milliseconds\\" but you can also pass in as the measurement \\"years\\", \\"months\\", \\"weeks\\", \\"days\\", \\"hours\\", \\"minutes\\", and \\"seconds\\"."
      difference: String
      "Configures the locale Moment.js will use to format the date."
      locale: String
    ): Date
    "The document's Prismic API URL."
    href: String
    "The document's URL derived via the link resolver."
    url: String
    "Globally unique identifier. Note that this differs from the \`prismicID\` field."
    id: ID!
    "The document's language."
    lang: String!
    "The document's most recent publication date"
    last_publication_date(
      "Format the date using Moment.js' date tokens, e.g. \`date(formatString: \\"YYYY MMMM DD\\")\`. See https://momentjs.com/docs/#/displaying/format/ for documentation for different tokens."
      formatString: String
      "Returns a string generated with Moment.js' \`fromNow\` function"
      fromNow: Boolean
      "Returns the difference between this date and the current time. Defaults to \\"milliseconds\\" but you can also pass in as the measurement \\"years\\", \\"months\\", \\"weeks\\", \\"days\\", \\"hours\\", \\"minutes\\", and \\"seconds\\"."
      difference: String
      "Configures the locale Moment.js will use to format the date."
      locale: String
    ): Date
    "The document's list of tags."
    tags: [String!]!
    "Alternate languages for the document."
    alternate_languages: [PrismicLinkType!]!
    "The document's Prismic API ID type."
    type: String!
    "The document's Prismic ID."
    prismicId: ID!
  }
`
