const { MongoClient } = require('mongodb');

const faker = require('faker');

const url = 'mongodb+srv://garcialex380:admin@cluster0.xhkci33.mongodb.net/?retryWrites=true&w=majority';

async function crearColeccion() {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const db = cliente.db('BabySoft');
    await db.createCollection('Permisos',{
    
      validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["idnombre", "nombre" ,"tipo","fecha","idpermiso"],

        properties: {
          idnombre: {
            bsonType: "int",
            description: "Debe de ingresar un numero del nombre"
          },
          nombre: {
            bsonType: "string",
            description: "Debe ingresar el nombre"
          },
          tipo: {
            bsonType: "string",
            description: "Debe de ingresar el tipo de permiso"
          },
          fecha: {
            bsonType: "date",
            description: "Debe ingresar la fecha"
          },
          idpermiso: {
            bsonType: "int",
            description: "Debe ingresar el numero del permiso"
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
      const collection = db.collection('Permisos');
  
      const documentos = [];
  
      for (let i = 0; i < 2000; i++) {
        const documento = {
          idnombre: faker.random.number(),
          nombre: faker.name.firstName(),
          tipo: faker.random.word(),
          fecha: faker.date.past(),
          idpermiso: faker.random.number()
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


async function insertarPermisos(nuevoPermiso){

   const cliente = new MongoClient(url)
 
   try {
       await cliente.connect();
       const result = await cliente.db('BabySoft').collection("Permisos").insertOne(nuevoPermiso);
       console.log(`Se creo un nuevo permiso con el siguiente id: ${result.insertedId}`);
       console.log(nuevoPermiso);
   } catch (e) {
       console.log(e)
   }finally{
       cliente.close()
   }
 }
 
//  insertarPermisos({
//    idnombre: 1,
//    nombre: "Administrador",
//    tipo: "acceso",
//    fecha: new Date(),
//    idpermiso: 2
//  });
 
async function insertarPermisos(permisos) {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const result = await cliente.db('BabySoft').collection('Permisos').insertMany(permisos);
    console.log(`Se insertaron ${result.insertedCount} documentos`);
  } catch (error) {
    console.error('Error al insertar documentos:', error);
  } finally {
    cliente.close();
  }
}

// insertarPermisos([
//   {
//     idnombre: 3,
//     nombre: "Invitado",
//     tipo: "acceso",
//     fecha: new Date(),
//     idpermiso: 4
//   },
//   {
//     idnombre: 4,
//     nombre: "Administrador",
//     tipo: "acceso",
//     fecha: new Date(),
//     idpermiso: 5
//   }
// ]);

async function consultarPermisos(filtro) {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const documentos = await cliente.db('BabySoft').collection('Permisos').find(filtro).toArray();
     console.log('Documentos encontrados:');
     console.log(documentos);
   } catch (error) {
     console.error('Error al consultar documentos:', error);
   } finally {
     cliente.close();
   }
 }
 
//  consultarPermisos({ idnombre: 1 });

async function actualizarPermiso(filtro, actualizacion) {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const result = await cliente.db('BabySoft').collection('Permisos').updateOne(filtro, { $set: actualizacion });
     console.log(`Se actualizó ${result.modifiedCount} documento(s)`);
   } catch (error) {
     console.error('Error al actualizar documento:', error);
   } finally {
     cliente.close();
   }
 }
 
//  actualizarPermiso({ idpermiso: 2 }, { nombre :"Empleado" })
 
async function actualizarPermisos(filtro, actualizacion) {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const result = await cliente.db('BabySoft').collection('Permisos').updateMany(filtro, { $set: actualizacion });
     console.log(`Se actualizó ${result.modifiedCount} documento(s)`);
   } catch (error) {
     console.error('Error al actualizar documentos:', error);
   } finally {
     cliente.close();
   }
 }
 
 //actualizarPermisos({ tipo: "acceso" }, { tipo: "acceso total" });

 async function eliminarPermiso(filtro) {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const result = await cliente.db('BabySoft').collection('Permisos').deleteOne(filtro);
     console.log(`Se eliminó ${result.deletedCount} documento(s)`);
   } catch (error) {
     console.error('Error al eliminar documento:', error);
   } finally {
     cliente.close();
   }
 }
 
 //eliminarPermiso({ idpermiso: 2 });

 async function eliminarPermisos(filtro) {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const result = await cliente.db('BabySoft').collection('Permisos').deleteMany(filtro);
     console.log(`Se eliminaron ${result.deletedCount} documento(s)`);
   } catch (error) {
      console.error('Error al eliminar documento:', error);
   } finally {
     cliente.close();
   }
   }
  // eliminarPermisos({ tipo: "acceso" });

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
 
//  eliminarColeccion('Permisos');


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
 
 //eliminarBaseDatos('BabySoft');

 async function realizarLookup() {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const resultado = await cliente.db('BabySoft').collection('Permisos').aggregate([
       {
         $lookup: {
           from: 'Usuarios',
           localField: 'idnombre',
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
 
 //realizarLookup();

 async function usarPipeline() {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const resultado = await cliente.db('BabySoft').collection('Permisos').aggregate([
       { $match: { tipo: "acceso" } },
       { $project: { nombre: 1, fecha: 1 } },
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
 
 //usarPipeline();

 async function usarLimit() {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const resultado = await cliente.db('BabySoft').collection('Permisos').find().limit(5).toArray();
     console.log('Resultado del $limit:');
     console.log(resultado);
   } catch (error) {
     console.error('Error al usar el $limit:', error);
   } finally {
     cliente.close();
   }
 }
 
 //usarLimit();

 async function usarSort() {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const resultado = await cliente.db('BabySoft').collection('Permisos').find().sort({ fecha: -1 }).toArray();
     console.log('Resultado del $sort:');
     console.log(resultado);
   } catch (error) {
   console.error('Error al usar el $sort:', error);
 } finally {
   cliente.close();
 }
}

//usarSort();

async function usarUnwind() {
   const cliente = new MongoClient(url);
   try {
     await cliente.connect();
     const resultado = await cliente.db('BabySoft').collection('Permisos').aggregate([
       { $unwind: "$nombre" }
     ]).toArray();
     console.log('Resultado del $unwind:');
     console.log(resultado);
   } catch (error) {
     console.error('Error al usar el $unwind:', error);
   } finally {
     cliente.close();
   }
 }
 
 //usarUnwind();
 