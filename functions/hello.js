import netlifyIdentity from "netlify-identity-widget"

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export function handler(event, context, callback) {
  
  console.log("Lambda function handler event: ", event)
  console.log("Lambda function handler context: ", context)
  callback(null, {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      msg: "Functions are here. Random number: " + Math.round(Math.random() * 10),
    }),
  })
}

