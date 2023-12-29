const crypto = require('crypto');
const { ITEMS_PER_PAGE } = require('./paginationConstant');

exports.generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

exports.ProductPagination = (query) => {

  let { page, size, sortBy, search,category='all', brand='all'} = query;
  if (!page) {
    page = 1;
  }

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
    const field = sortBy.substring(1);
    sortOptions[field] = -1;
  } else {
    // Ascending order
    sortOptions[sortBy] = 1;
  }
  }

 // Construct the category and brand filters
 const categoryFilter = category !== 'all' ? { category } : {};
 const brandFilter = brand !== 'all' ? { brand } : {};

  // Construct the search query based on the 'search' parameter
  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search by name
          { description: { $regex: search, $options: 'i' } } // Case-insensitive search by description
        ]
      }
    : {};

    const filters = {
      ...categoryFilter,
      ...brandFilter,
      ...searchQuery,
    };

  return {
    currentPage,
    limit,
    sortOptions,
    filters
  };
};

exports.caculateItems=(items)=>{
  const products = items.map(item => {   
    item.totalPrice = 0;
    item.purchasePrice = item.price;

    const price = item.purchasePrice;
    const {quantity} = item;
    item.totalPrice = parseFloat(Number((price * quantity).toFixed(2)));
    return item;
  });
  return products;
};

