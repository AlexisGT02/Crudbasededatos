const { MongoClient } = require('mongodb');

const faker = require('faker');

const url = 'mongodb+srv://garcialex380:admin@cluster0.xhkci33.mongodb.net/?retryWrites=true&w=majority';

async function crearColeccion() {
  const cliente = new MongoClient(url);
  try {
    await cliente.connect();
    const db = cliente.db('BabySoft');
    await db.createCollection('Configuracion',{
    
      validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["idConfiguracion", "idRol" ,"idPermiso","descripcion","fecha"],

        properties: {
            idConfiguracion: {
            bsonType: "int",
            description: "Debe de ingresar el id "
          },
          idRol: {
            bsonType: "int",
            description: "Debe ingresar el id del rol"
          },
          idPermiso: {
            bsonType: "int",
            description: "Debe de ingresar el id del permiso"
          },
          descripcion: {
            bsonType: "string",
            description: "Debe ingresar una descripcion"
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
      const collection = db.collection('Configuracion');
  
      const documentos = [];
  
      for (let i = 0; i < 2000; i++) {
        const documento = {
          idConfiguracion: faker.random.number(),
          idRol: faker.random.number(),
          idPermiso: faker.random.number(),
          descripcion: faker.lorem.sentence(),
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

async function insertarConfiguracion(nuevaConfiguracion) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Configuracion').insertOne(nuevaConfiguracion);
      console.log(`Se creó una nueva configuración con el siguiente id: ${result.insertedId}`);
      console.log(nuevaConfiguracion);
    } catch (error) {
      console.log(error);
    } finally {
      cliente.close();
    }
}

insertarConfiguracion({
    idConfiguracion: 1,
    idRol: 1,
    idPermiso: 1,
    descripcion: "Descripción de la configuración",
    fecha: new Date()
});
  
async function insertarConfiguraciones(configuraciones) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Configuracion').insertMany(configuraciones);
      console.log(`Se insertaron ${result.insertedCount} documentos`);
    } catch (error) {
      console.error('Error al insertar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// insertarConfiguraciones([
//     {
//       idConfiguracion: 2,
//       idRol: 2,
//       idPermiso: 2,
//       descripcion: "Descripción de la configuración 2",
//       fecha: new Date()
//     },
//     {
//       idConfiguracion: 3,
//       idRol: 3,
//       idPermiso: 3,
//       descripcion: "Descripción de la configuración 3",
//       fecha: new Date()
//     }
// ]);
  
async function consultarConfiguraciones(filtro) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const documentos = await cliente.db('BabySoft').collection('Configuracion').find(filtro).toArray();
      console.log('Documentos encontrados:');
      console.log(documentos);
    } catch (error) {
      console.error('Error al consultar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// consultarConfiguraciones({ idConfiguracion: 1 });
  
async function actualizarConfiguracion(filtro, actualizacion) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Configuracion').updateOne(filtro, { $set: actualizacion });
      console.log(`Se actualizó ${result.modifiedCount} documento(s)`);
    } catch (error) {
      console.error('Error al actualizar documento:', error);
    } finally {
      cliente.close();
    }
}
  
// actualizarConfiguracion({ idConfiguracion: 1 }, { descripcion: "Nueva descripción" });
  
async function actualizarConfiguraciones(filtro, actualizacion) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Configuracion').updateMany(filtro, { $set: actualizacion });
      console.log(`Se actualizó ${result.modifiedCount} documento(s)`);
    } catch (error) {
      console.error('Error al actualizar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// actualizarConfiguraciones({ idRol: 2 }, { descripcion: "Nueva descripción" });
  
async function eliminarConfiguracion(filtro) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Configuracion').deleteOne(filtro);
      console.log(`Se eliminó ${result.deletedCount} documento(s)`);
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    } finally {
      cliente.close();
    }
}
  
// eliminarConfiguracion({ idConfiguracion: 1 });
  
async function eliminarConfiguraciones(filtro) {
    const cliente = new MongoClient(url);
    try {
      await cliente.connect();
      const result = await cliente.db('BabySoft').collection('Configuracion').deleteMany(filtro);
      console.log(`Se eliminaron ${result.deletedCount} documento(s)`);
    } catch (error) {
      console.error('Error al eliminar documentos:', error);
    } finally {
      cliente.close();
    }
}
  
// eliminarConfiguraciones({ idRol: 2 });
  
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
  
// eliminarColeccion('Configuracion');
  
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
      const resultado = await cliente.db('BabySoft').collection('Configuracion').aggregate([
        {
          $lookup: {
            from: 'Usuarios',
            localField: 'idConfiguracion',
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
      const resultado = await cliente.db('BabySoft').collection('Configuracion').aggregate([
        { $match: { idRol: 1 } },
        { $project: { descripcion: 1, fecha: 1 } },
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
      const resultado = await cliente.db('BabySoft').collection('Configuracion').find().limit(5).toArray();
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
      const resultado = await cliente.db('BabySoft').collection('Configuracion').find().sort({ fecha: -1 }).toArray();
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
      const resultado = await cliente.db('BabySoft').collection('Configuracion').aggregate([
        { $unwind: "$descripcion" }
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
  
  