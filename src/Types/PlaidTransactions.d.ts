/**
 * @typedef {Object} PlaidTransactionLocation
 * @property {string|null} [address]
 * @property {string|null} [city]
 * @property {string|null} [region]
 * @property {string|null} [postalCode]
 * @property {string|null} [country]
 */

/**
 * @typedef {Object} PlaidTransactionCategory
 * @property {string|null} [primary]
 * @property {string|null} [detailed]
 * @property {string|null} [confidenceLevel]
 */

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {Array} [subCategories]
 * @property {string} [transactionType]
 */

/**
 * @typedef {Object} PlaidTransaction
 * @property {string} id
 * @property {string} name
 * @property {string|null} [currencyCode]
 * @property {string} [merchantName]
 * @property {string} [accountId]
 * @property {number} amount
 * @property {string|null} [date] // 'YYYY-MM-DD'
 * @property {PlaidTransactionLocation|null} [location]
 * @property {string|null} [transactionType]
 * @property {string|null} [logoUrl]
 * @property {string|null} [website]
 * @property {PlaidTransactionCategory|null} [plaidCategory]
 * @property {string|null} [categoryIconUrl]
 * @property {string|null} [merchantEntityId]
 * @property {number|null} [categoryId]
 * @property {Category|null} [category]
 */