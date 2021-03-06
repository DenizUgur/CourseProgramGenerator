import { getResult } from './process';
import moment from 'moment';

const world = require('../../__mocks__/catalog.json').courses;

const c = (s, e) => {
	return {
		start: moment.utc(s, 'd,HH:mm').valueOf(),
		end: moment.utc(e, 'd,HH:mm').valueOf(),
	};
};

async function test(input, uhours = '', size = false) {
	return getResult(world, input, uhours).then(tables => {
		if (size) {
			return tables.primary.length;
		}
		return tables.primary[0].name;
	});
}

describe('Algorithm Test', () => {
	let dateSpy;

	afterAll(() => {
		dateSpy.mockRestore();
	});

	beforeAll(() => {
		dateSpy = jest
			.spyOn(global.Date, 'now')
			.mockImplementation(() => Date.parse('2020-06-28'));
	});

	it("shouldn't give anything when NAN.101 is given", () => {
		return expect(test(['NAN.101'], '', true)).resolves.toBe(0);
	});
	it('should give CS.451 when CS.451 & EE.202 are given in that order', () => {
		return expect(test(['CS.451', 'EE.202'])).resolves.toBe('CS.451');
	});
	it('should give CS.202 when CS.202 & CS.333 are given', () => {
		return expect(test(['CS.202', 'CS.333'])).resolves.toBe('CS.202');
	});
	it("should give 4 course when ENG.102 & CS.102 and unavailable hours '2,09:40 2,12:40' are given", () => {
		return expect(
			test(['ENG.102', 'CS.102'], [c('2,09:40', '2,12:40')], true)
		).resolves.toBe(2);
	});
	it('should give 2 course when MATH.212 & ECON.210 are given', () => {
		return expect(test(['MATH.212', 'ECON.210'], [], true)).resolves.toBe(2);
	});
	it("should give 0 course when CS.333 & unavailable hours '2,11:40 2,12:40' are given", () => {
		return expect(
			test(['CS.333'], [c('2,11:40', '2,12:40')], true)
		).resolves.toBe(0);
	});
	it('should give 8 course when CS.451 HIST.201 ME.395 CS.333 CS.350 CS.423 BUS.102 are given', () => {
		return expect(
			test(
				['CS.451', 'HIST.201', 'ME.395', 'CS.333', 'CS.350', 'CS.423', 'BUS.102'],
				[],
				true
			)
		).resolves.toBe(8);
	});
});
