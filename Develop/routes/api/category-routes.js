const router = require('express').Router();
const { Category, Product } = require('../../models');
const { rawAttributes, findByPk } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: { model: Product, attributes: ['id', 'product_name', 'price' ,'stock', 'category_id']
     },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCatId = await Category.findByPk(req.params.id, {
      include: { model: Product, attributes: ['id', 'product_name', 'price' ,'stock', 'category_id']
       },
    });

    if (!getCatId) {
      res.status(400).json( { message: 'No category can be found with this Id!' });
    }

    res.status(200).json(getCatId);

  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
     const createCategory = await Category.create(req.body);
       res.status(200).json(createCategory);

  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.json(updateCategory);

  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.json(delCategory);
    
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;