import { getResult } from './process';

const world = require('../../__mocks__/catalog.json');

async function test(input, uhours = '', size = false) {
	return getResult(world, input, uhours).then(tables => {
		if (size) {
			return tables[0].length;
		}
		return tables[0][0][0];
	});
}

describe('Algorithm Test', () => {
	it("shouldn't give anything when NAN.101 is given", () => {
		return expect(test('NAN.101', '', true)).resolves.toBe(0);
	});
	it('should give CS.451 when CS.451 & EE.202 are given in that order', () => {
		return expect(test('CS.451 EE.202')).resolves.toBe('CS.451');
	});
	it('should give CS.202 when CS.202 & CS.333 are given', () => {
		return expect(test('CS.202 CS.333')).resolves.toBe('CS.202');
	});
	it("should give 4 course when ENG.102 & CS.102 and unavailable hours '2,09:40 2,12:40' are given", () => {
		return expect(test('ENG.102 CS.102', '2,09:40 2,12:40', true)).resolves.toBe(
			2
		);
	});
	it('should give 2 course when MATH.212 & ECON.210 are given', () => {
		return expect(test('MATH.212 ECON.210', '', true)).resolves.toBe(2);
	});
	it("should give 0 course when CS.333 & unavailable hours '2,11:40 2, 12:40' are given", () => {
		return expect(test('CS.333', '2,11:40 2, 12:40', true)).resolves.toBe(0);
	});
	it('should give 8 course when CS.451 HIST.201 ME.395 CS.333 CS.350 CS.423 BUS.102 are given', () => {
		return expect(
			test('CS.451 HIST.201 ME.395 CS.333 CS.350 CS.423 BUS.102', '', true)
		).resolves.toBe(8);
	});
});
