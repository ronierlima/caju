import app from './app';
import database from './connection';

database.sync();
console.log('Sever: ... Database running at 3306');


app.listen(3000);
console.log('Sever: ... Serve running at 3000');

