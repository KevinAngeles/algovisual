import { expect } from 'chai';
import { filterNonNumericCharacters } from '../assets/js/utils/helper';

describe('Validate Helper', () => {
  describe('filterNonNumericCharacters', () => {
    it('should return string', () => {
      const input = '13W';
      const output = filterNonNumericCharacters(input);
      expect(output).to.be.a('string');
    });
    it('should return empty string when input is empty', () => {
      const input = '';
      const output = filterNonNumericCharacters(input);
      expect(output).to.be.empty;
    });
    it('should return empty string when input has only blank spaces', () => {
      const input = '   ';
      const output = filterNonNumericCharacters(input);
      expect(output).to.be.empty;
    });
    it('should return empty string when input has only tabs', () => {
      const input = '		';
      const output = filterNonNumericCharacters(input);
      expect(output).to.be.empty;
    });
    it('should return empty string when input has only special characters', () => {
      const input = '#$%^"@`';
      const output = filterNonNumericCharacters(input);
      expect(output).to.be.empty;
    });
    it('should return numeric string when input has only letters and special characters', () => {
      const input = '#$23^7"@`0';
      const output = filterNonNumericCharacters(input);
      expect(output).to.equal('2370');
    });
    it('should return only integer string when input has only digits and special characters', () => {
      const input = '1.38';
      const output = filterNonNumericCharacters(input);
      expect(output).to.equal('138');
    });
    it('should return only integer string when input has only digits and blank spaces or tabs', () => {
      const input = ' 138	';
      const output = filterNonNumericCharacters(input);
      expect(output).to.equal('138');
    });
    it('should return only numeric string when input has only digits', () => {
      const input = '775';
      const output = filterNonNumericCharacters(input);
      expect(output).to.equal('775');
    });
  });
});
