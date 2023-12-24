const crypto = require('crypto');
const { ITEMS_PER_PAGE } = require('./paginationConstant');

exports.generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

exports.ValidatePagination = (query) => {
  // eslint-disable-next-line prefer-const
  let { page, size, sortBy, search } = query;

  // Ensure a valid page number is assigned
  if (!page) {
    page = 1;
  }

  // Ensure a valid size for paginating items is assigned
  if (!size) {
    size = ITEMS_PER_PAGE;
  }

  if (!sortBy) {
    sortBy = 1;
  }

  const limit = parseInt(size, 10);
  const currentPage = parseInt(page, 10);

  const sortOptions = {};
  if (typeof sortBy === 'string') {
  if (sortBy.startsWith('-')) {
    // Descending order
    const field = sortBy.substring(1); // Remove the leading "-"
    sortOptions[field] = -1;
  } else {
    // Ascending order
    sortOptions[sortBy] = 1;
  }
  }

  // Construct the search query based on the 'search' parameter
  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search by name
          { description: { $regex: search, $options: 'i' } } // Case-insensitive search by description
        ]
      }
    : {};

  return {
    currentPage,
    limit,
    sortOptions,
    searchQuery
  };
};

exports.groupCartItemsByProductId=(cartItems)=> {
  const groupedItems = cartItems.reduce((result, item) => {
    const { id,productId, price, quantity,name,image } = item;
    if (!result[productId]) {
        // eslint-disable-next-line no-param-reassign
        result[productId] = {
            id,
            productId,
            quantity: 0,
            price: 0,
            name,
            image
        };
    }
    const currentItem = result[productId];
    currentItem.quantity += parseInt(quantity, 10);
    currentItem.price += parseInt(price.replace(/,/g, ''), 10) * parseInt(quantity, 10);
    return result;
}, {});

  return Object.values(groupedItems);
};