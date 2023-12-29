
exports.getStoreProductsQuery = (min, max) => {
    max = Number(max);
    min = Number(min);
  
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
 
    const matchQuery = {
      isActive: true,
      price: priceFilter.price
    };
  
    const basicQuery = [
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brands'
        }
      },
      {
        $unwind: {
          path: '$brands',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'brand.name': '$brands.name',
          'brand.description': '$brands.description',
          'brand._id': '$brands._id'
        }
      },    
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'category.name': '$categories.name',
          'category.description': '$categories.description',
          'category._id': '$categories._id'
        }
      },

      {
        $match: matchQuery
      },
      {
        $project: {
          brands: 0,
          categories: 0
        }
      }
    ];
  
    return basicQuery;
  };