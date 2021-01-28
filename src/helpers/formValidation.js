import * as yup from "yup";

const schemaLogIn = yup.object().shape({
  email: yup.string().required("O campo email é obrigatório!"),
  password: yup.string().required("O campo senha é obrigatório!"),
});

const schemaPerfil = yup.object().shape({
  email: yup.string().required("O campo email é obrigatório!"),
  first_name: yup.string().required("O campo primeiro nome é obrigatório!"),
  last_name: yup.string().required("O campo último nome é obrigatório!"),
});

export { schemaLogIn, schemaPerfil };
