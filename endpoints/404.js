module.exports = async (req, res) => {
    res.status(404).render("errors/404");
}