const path = require('path');

module.exports = {
    entry: ["whatwg-fetch", "./src/index.jsx"],
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: "babel-loader"
            }
        ]
    }
};