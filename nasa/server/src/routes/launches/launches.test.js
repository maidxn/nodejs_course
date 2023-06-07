const request = require('supertest')

const app = require('../../app')

const { 
    mongoConnect, 
    mongoDisconnect
 } = require('../../services/mongo')

describe('Test launches API with MongoDB', () => {
    beforeAll(async() => {
        await mongoConnect()
    })

    afterAll(async() => {
        await mongoDisconnect()
    })

    describe('Test GET /launches', () => {
        test('Return 200 status code', async () => {
            const response = await request(app)
            .get('/launches')
            .expect(200)
            .expect('Content-Type', /json/)
        })
    })
    
    describe('Test POST /launches', () => {
        const launchObject = {
            mission: "Destroy human",
            rocket: 'Mayd',
            target: 'Kepler-62 f',
            launchDate: 'May 20, 2023'
        }
    
        const launchObjectWithoutDate = {
            mission: "Destroy human",
            rocket: 'Mayd',
            target: 'Kepler-62 f'
        }
    
        const launchObjectInvalidDate = {
            mission: "Destroy human",
            rocket: 'Mayd',
            target: 'Kepler-62 f',
            launchDate: 'Do you wanna build a snowman?'
        }
    
        test('Return 201 in POST', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchObject)
                .expect(201)
            
            const requestDate =  new Date(launchObject.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
            expect(responseDate).toBe(requestDate)
        
            expect(response.body).toMatchObject(launchObjectWithoutDate)
    
        })
    
        test('Catch missing data', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchObjectWithoutDate)
                .expect(400)
            expect(response.body).toStrictEqual({
                error: 'Beep...bop...missing...U, Data!!!'
            })
        })
    
        test('Catch invalid date', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchObjectInvalidDate)
                .expect(400)
            expect(response.body).toStrictEqual({
                error: 'This is not a valid date'
            })
        })
    })
    
})

