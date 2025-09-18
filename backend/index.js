const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình DynamoDB
AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'HelloWorldTable';

app.post('/save', async (req, res) => {
  const { value } = req.body;
  await dynamoDB.put({
    TableName: TABLE_NAME,
    Item: { id: 'test', value }
  }).promise();
  res.json({ message: 'Saved!' });
});

app.get('/get', async (req, res) => {
  const result = await dynamoDB.get({
    TableName: TABLE_NAME,
    Key: { id: 'test' }
  }).promise();
  res.json({ value: result.Item?.value || null });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
