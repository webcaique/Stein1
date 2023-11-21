const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simples banco de dados de usuários para demonstração (substitua por um banco de dados real)
const usuarios = [];

app.post('/enviar-email-verificacao', (req, res) => {
  const { email } = req.body;

  // Verifica se o e-mail já foi registrado
  const usuarioExistente = usuarios.find(user => user.email === email);
  if (usuarioExistente) {
    res.status(400).json({ error: 'Este e-mail já está registrado.' });
    return;
  }

  // Gera um token de verificação
  const token = crypto.randomBytes(20).toString('hex');

  // Salva o usuário e o token no "banco de dados"
  usuarios.push({ email, token });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'steinsuport@gmail.com',
      pass: 'Stein.2023.amaLaranja',
    },
  });

  const mailOptions = {
    from: 'steinsuport@gmail.com',
    to: email,
    subject: 'Verificação de E-mail',
    text: `Clique no link a seguir para verificar seu e-mail: http://localhost:3000/verificar-email/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail de verificação:', error);
      res.status(500).json({ error: 'Erro ao enviar e-mail de verificação.' });
    } else {
      console.log('E-mail de verificação enviado:', info.response);
      res.json({ success: 'E-mail de verificação enviado com sucesso!' });
    }
  });
});

app.get('/verificar-email/:token', (req, res) => {
  const { token } = req.params;

  // Encontrar usuário pelo token no "banco de dados"
  const usuario = usuarios.find(user => user.token === token);

  if (usuario) {
    // Marcar o usuário como verificado (pode ser feito em um banco de dados real)
    usuario.verificado = true;
    res.send('E-mail verificado com sucesso!');
  } else {
    res.status(400).send('Token de verificação inválido.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
