const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include:{ model: Product }
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTagId = await Tag.findByPk(req.params.id, {
      include: { model: Product }
    });

    if(!getTagId) {
      res.status(404).json({ message: 'No tag can be found with this Id!' });
    }

    res.status(200).json(getTagId);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTags = await Tag.update(req.body, {
        where: 
        {
          id: req.params.id,
        }
      });
      res.json(updateTags);

  } catch(err) {
    res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.json(delTag);
    
  } catch(err){
    res.status(500).json(err);
  }
  

});

module.exports = router;