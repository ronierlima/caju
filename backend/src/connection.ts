import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('mysql://root:19981209@localhost:3306/caju');

export default sequelize;