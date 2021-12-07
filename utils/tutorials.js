const { tutorial } = require('../models');
const to = require('../utils/to');
const uuidv1 = require('uuid/v1');
var showdown = require('showdown');
const moment = require('moment');
const { Op } = require('sequelize');

exports.addTutorial = async (req, res) => {
  const tutorialId = await uuidv1();
  let [err, newTutorial] = await to(
    tutorial.create({ ...req.body, tutorialId })
  );
  if (err) return res.sendError(err, 'Could not create tutorial');
  return res.sendSuccess(newTutorial, 'Tutorial created');
};

exports.editTutorial = async (req, res) => {
  try {
    let [err, result] = await to(
      tutorial.update(
        {
          name: req.body.name,
          description: req.body.description,
          content: req.body.content,
          domain: req.body.domain,
          author: req.body.author,
        },
        {
          where: {
            tutorialId: req.body.tutorialId,
          },
        }
      )
    );
    if (err) return res.sendError(err);
    return res.sendSuccess(null);
  } catch (err) {
    return res.sendError(err);
  }
};

exports.tutorials = async (req, res) => {
  const [err, tutorials] = await to(
    tutorial.findAll({
      attributes: [
        'tutorialId',
        'name',
        'description',
        'domain',
        'author',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    })
  );
  if (err) return res.sendError(err);
  return res.sendSuccess(tutorials);
};

exports.getTutorial = async (req, res) => {
  const [err, tutorialData] = await to(
    tutorial.findOne({
      where: { tutorialId: req.params.tutorialId },
      attributes: [
        'tutorialId',
        'name',
        'description',
        'content',
        'domain',
        'author',
      ],
    })
  );
  if (err) return res.sendError(err);
  if (!tutorialData) return res.sendError(null, 'Tutorial not found', 404);
  if (String(req.query.tutFormat) == 'HTML') {
    /*const headHtmlContent = "<html><head><style> div , code , pre { word-wrap: break-word; overflow-x: hidden; white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; max-width: 100%; overflow-wrap: break-word; } img { max-width: 80%; } </style></head><body><div>";
    const footHtmlContent = "</div></body></html>";*/
    var converter = new showdown.Converter();
    tutorialData['dataValues']['content'] = converter.makeHtml(
      tutorialData['dataValues']['content']
    );
  }
  return res.sendSuccess(tutorialData);
};
