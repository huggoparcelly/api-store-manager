// retirado da atividade do bloco 27

module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(422)
      .json({
        err: {
          message: err.details[0].message,
          code: err.data,
        } });
  }

  const statusByErrorCode = { notFound: 404, alreadyExists: 422 };
  const status = statusByErrorCode[err.code] || 500;
  res.status(status).json({ err: { message: err.message } });
};