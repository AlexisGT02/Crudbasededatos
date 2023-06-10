const { MongoClient } = require('mongodb');

const faker = require('faker');

const url = 'mongodb+srv://garcialex380:admin@cluster0.xhkci33.mongodb.net/?retryWrites=true&w=majority';

async function crearColeccion() {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const db = cliente.db('BabySoft');
    await db.createCollection('Roles',{
    
      validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["idRol", "nombreRol" ,"tipoRol","idUsuario","fecha"],

        properties: {
            idRol: {
            bsonType: "int",
            description: "Debe de ingresar el id del rol"
          },
          nombreRol: {
            bsonType: "string",
            description: "Debe ingresar el nombre del rol"
          },
          tipoRol: {
            bsonType: "string",
            description: "Debe de ingresar el tipo del rol"
          },
          idUsuario: {
            bsonType: "int",
            description: "Debe ingresar el id del usuario"
          },
          fecha: {
            bsonType: "date",
            description: "Debe ingresar la fecha"
          },
        }
      }
    }
  })
   
    console.log('Colección creada exitosamente');
  } catch (error) {
    console.error('Error al crear la colección:', error);
  } finally {
    cliente.close();
  }
}

// crearColeccion();

async function insertarDocumentos() {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const db = cliente.db('BabySoft');
      const collection = db.collection('Roles');
  
      const documentos = [];
  
      for (let i = 0; i < 2000; i++) {
        const documento = {
          idRol: faker.random.number(),
          nombreRol: faker.name.jobTitle(),
          tipoRol: faker.random.word(),
          idUsuario: faker.random.number(),
          fecha: faker.date.past(),
        };
        documentos.push(documento);
      }
  
      await collection.insertMany(documentos);
  
      console.log('Documentos insertados exitosamente');
    } catch (error) {
      console.error('Error al insertar los documentos:', error);
    } finally {
      cliente.close();
    }
}

// insertarDocumentos();

async function insertarRol(nuevoRol) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Roles').insertOne(nuevoRol);
      console.log(`Se creó un nuevo rol con el siguiente id: ${result.insertedId}`);
      console.log(nuevoRol);
    } catch (error) {
      console.log(error);
    } finally {
      cliente.close();
    }
}
  
// insertarRol({
//     idRol: 1,
//     nombreRol: "Administrador",
//     tipoRol: "acceso",
//     idUsuario: 2,
//     fecha: new Date()
// });
  
async function insertarRoles(roles) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Roles').insertMany(roles);
      console.log(`Se insertaron ${result.insertedCount} documentos`);
    } catch (error) {
      console.error('Error al insertar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// insertarRoles([
//     {
//       idRol: 3,
//       nombreRol: "Invitado",
//       tipoRol: "acceso",
//       idUsuario: 4,
//       fecha: new Date()
//     },
//     {
//       idRol: 4,
//       nombreRol: "Administrador",
//       tipoRol: "acceso",
//       idUsuario: 5,
//       fecha: new Date()
//     }
// ]);
  
async function consultarRoles(filtro) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const documentos = await cliente.db('BabySoft').collection('Roles').find(filtro).toArray();
      console.log('Documentos encontrados:');
      console.log(documentos);
    } catch (error) {
      console.error('Error al consultar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// consultarRoles({ idRol: 1 });
  
async function actualizarRol(filtro, actualizacion) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Roles').updateOne(filtro, { $set: actualizacion });
      console.log(`Se actualizó ${result.modifiedCount} documento(s)`);
    } catch (error) {
      console.error('Error al actualizar documento:', error);
    } finally {
      cliente.close();
    }
}
  
// actualizarRol({ idRol: 2 }, { nombreRol: "Empleado" });
  
async function actualizarRoles(filtro, actualizacion) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Roles').updateMany(filtro, { $set: actualizacion });
      console.log(`Se actualizó ${result.modifiedCount} documento(s)`);
    } catch (error) {
      console.error('Error al actualizar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// actualizarRoles({ tipoRol: "acceso" }, { tipoRol: "acceso total" });
  
async function eliminarRol(filtro) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Roles').deleteOne(filtro);
      console.log(`Se eliminó ${result.deletedCount} documento(s)`);
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    } finally {
      cliente.close();
    }
}
  
// eliminarRol({ idRol: 2 });
  
async function eliminarRoles(filtro) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Roles').deleteMany(filtro);
      console.log(`Se eliminaron ${result.deletedCount} documento(s)`);
    } catch (error) {
      console.error('Error al eliminar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// eliminarRoles({ tipoRol: "acceso" });
  
async function eliminarColeccion(nombreColeccion) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      await cliente.db('BabySoft').collection(nombreColeccion).drop();
      console.log(`Se eliminó la colección ${nombreColeccion}`);
    } catch (error) {
      console.error('Error al eliminar la colección:', error);
    } finally {
      cliente.close();
    }
}
  
// eliminarColeccion('Roles');
  
async function eliminarBaseDatos(nombreBaseDatos) {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      await cliente.db(nombreBaseDatos).dropDatabase();
      console.log(`Se eliminó la base de datos ${nombreBaseDatos}`);
    } catch (error) {
      console.error('Error al eliminar la base de datos:', error);
    } finally {
      cliente.close();
    }
}
  
// eliminarBaseDatos('BabySoft');
  
async function realizarLookup() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const resultado = await cliente.db('BabySoft').collection('Roles').aggregate([
        {
          $lookup: {
            from: 'Usuarios',
            localField: 'idUsuario',
            foreignField: 'id',
            as: 'usuario'
          }
        }
      ]).toArray();
      console.log('Resultado del $lookup:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al realizar el $lookup:', error);
    } finally {
      cliente.close();
    }
}
  
// realizarLookup();
  
async function usarPipeline() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const resultado = await cliente.db('BabySoft').collection('Roles').aggregate([
        { $match: { tipoRol: "acceso" } },
        { $project: { nombreRol: 1, fecha: 1 } },
        { $sort: { fecha: -1 } }
      ]).toArray();
      console.log('Resultado del pipeline:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al usar el pipeline:', error);
    } finally {
      cliente.close();
    }
}
  
// usarPipeline();
  
async function usarLimit() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const resultado = await cliente.db('BabySoft').collection('Roles').find().limit(5).toArray();
      console.log('Resultado del $limit:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al usar el $limit:', error);
    } finally {
      cliente.close();
    }
}
  
// usarLimit();
  
async function usarSort() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const resultado = await cliente.db('BabySoft').collection('Roles').find().sort({ fecha: -1 }).toArray();
      console.log('Resultado del $sort:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al usar el $sort:', error);
    } finally {
      cliente.close();
    }
}
  
// usarSort();
  
async function usarUnwind() {
    const cliente = new MongoClient(url);
  
    try {
      await cliente.connect();
      const resultado = await cliente.db('BabySoft').collection('Roles').aggregate([
        { $unwind: "$nombreRol" }
      ]).toArray();
      console.log('Resultado del $unwind:');
      console.log(resultado);
    } catch (error) {
      console.error('Error al usar el $unwind:', error);
    } finally {
      cliente.close();
    }
}
  
// usarUnwind();
  