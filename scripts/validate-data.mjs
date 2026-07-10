#!/usr/bin/env node
// Validates src/data/lenses.json: required fields, types, id uniqueness,
// URL format, and enum values. Exits non-zero on any error.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'lenses.json');

const REQUIRED_STRING_FIELDS = [
  'id',
  'brand',
  'model',
  'mount',
  'format',
  'lensType',
  'focusType',
  'officialUrl',
  'notes',
];

const REQUIRED_NUMBER_FIELDS = [
  'focalLengthMin',
  'focalLengthMax',
  'maxAperture',
  'minAperture',
  'weightGram',
  'minFocusDistanceM',
  'maxMagnification',
  'releaseYear',
];

const REQUIRED_BOOLEAN_FIELDS = ['allianceMember', 'stabilization'];

const VALID_FORMATS = ['Full Frame', 'APS-C'];
const VALID_LENS_TYPES = ['Prime', 'Zoom'];
const VALID_FOCUS_TYPES = ['AF', 'MF'];
const VALID_CATEGORIES = ['Wide Angle', 'Standard', 'Portrait', 'Telephoto', 'Macro', 'Cine'];
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateLens(lens, index) {
  const errors = [];
  const where = `lens[${index}]${lens && lens.id ? ` (${lens.id})` : ''}`;

  if (typeof lens !== 'object' || lens === null) {
    return [`${where}: entry is not an object`];
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof lens[field] !== 'string' || lens[field].trim() === '') {
      errors.push(`${where}: missing or empty required string field "${field}"`);
    }
  }

  for (const field of REQUIRED_NUMBER_FIELDS) {
    if (typeof lens[field] !== 'number' || Number.isNaN(lens[field])) {
      errors.push(`${where}: missing or invalid required number field "${field}"`);
    }
  }

  for (const field of REQUIRED_BOOLEAN_FIELDS) {
    if (typeof lens[field] !== 'boolean') {
      errors.push(`${where}: missing or invalid required boolean field "${field}"`);
    }
  }

  if (typeof lens.id === 'string' && !ID_PATTERN.test(lens.id)) {
    errors.push(`${where}: id "${lens.id}" must be lowercase kebab-case (letters, numbers, hyphens)`);
  }

  if (lens.mount !== 'L-Mount') {
    errors.push(`${where}: mount must be exactly "L-Mount", got "${lens.mount}"`);
  }

  if (!VALID_FORMATS.includes(lens.format)) {
    errors.push(`${where}: format must be one of ${VALID_FORMATS.join(', ')}, got "${lens.format}"`);
  }

  if (!VALID_LENS_TYPES.includes(lens.lensType)) {
    errors.push(`${where}: lensType must be one of ${VALID_LENS_TYPES.join(', ')}, got "${lens.lensType}"`);
  }

  if (!VALID_FOCUS_TYPES.includes(lens.focusType)) {
    errors.push(`${where}: focusType must be one of ${VALID_FOCUS_TYPES.join(', ')}, got "${lens.focusType}"`);
  }

  if (lens.filterThreadMm !== null && typeof lens.filterThreadMm !== 'number') {
    errors.push(`${where}: filterThreadMm must be a number or null`);
  }

  if (lens.weatherSealed !== null && typeof lens.weatherSealed !== 'boolean') {
    errors.push(`${where}: weatherSealed must be a boolean or null`);
  }

  if (lens.notesZh !== undefined && (typeof lens.notesZh !== 'string' || lens.notesZh.trim() === '')) {
    errors.push(`${where}: notesZh, if present, must be a non-empty string`);
  }

  if (!Array.isArray(lens.category) || lens.category.length === 0) {
    errors.push(`${where}: category must be a non-empty array`);
  } else {
    for (const cat of lens.category) {
      if (!VALID_CATEGORIES.includes(cat)) {
        errors.push(`${where}: invalid category "${cat}" (allowed: ${VALID_CATEGORIES.join(', ')})`);
      }
    }
  }

  if (!Array.isArray(lens.sourceUrls) || lens.sourceUrls.length === 0) {
    errors.push(`${where}: sourceUrls must be a non-empty array (cite at least one source)`);
  } else {
    for (const url of lens.sourceUrls) {
      if (!isValidUrl(url)) errors.push(`${where}: invalid sourceUrls entry "${url}"`);
    }
  }

  if (!isValidUrl(lens.officialUrl)) {
    errors.push(`${where}: invalid officialUrl "${lens.officialUrl}"`);
  }

  if (!Array.isArray(lens.affiliateUrls)) {
    errors.push(`${where}: affiliateUrls must be an array (can be empty)`);
  } else {
    for (const [i, entry] of lens.affiliateUrls.entries()) {
      if (!entry || typeof entry.label !== 'string' || !isValidUrl(entry.url)) {
        errors.push(`${where}: affiliateUrls[${i}] must have a string "label" and a valid "url"`);
      }
    }
  }

  if (!Array.isArray(lens.retailerSearchUrls)) {
    errors.push(`${where}: retailerSearchUrls must be an array (can be empty)`);
  } else {
    for (const [i, entry] of lens.retailerSearchUrls.entries()) {
      if (!entry || typeof entry.label !== 'string' || !isValidUrl(entry.url)) {
        errors.push(`${where}: retailerSearchUrls[${i}] must have a string "label" and a valid "url"`);
      }
    }
  }

  if (
    typeof lens.focalLengthMin === 'number'
    && typeof lens.focalLengthMax === 'number'
    && lens.focalLengthMin > lens.focalLengthMax
  ) {
    errors.push(`${where}: focalLengthMin (${lens.focalLengthMin}) cannot be greater than focalLengthMax (${lens.focalLengthMax})`);
  }

  if (
    typeof lens.maxAperture === 'number'
    && typeof lens.minAperture === 'number'
    && lens.maxAperture > lens.minAperture
  ) {
    errors.push(`${where}: maxAperture (f/${lens.maxAperture}) cannot be a larger f-number than minAperture (f/${lens.minAperture})`);
  }

  return errors;
}

function main() {
  let raw;
  try {
    raw = readFileSync(DATA_PATH, 'utf-8');
  } catch (err) {
    console.error(`Could not read ${DATA_PATH}: ${err.message}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`Invalid JSON in ${DATA_PATH}: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error(`${DATA_PATH} must contain a JSON array of lens objects.`);
    process.exit(1);
  }

  const errors = [];
  const seenIds = new Map();

  data.forEach((lens, index) => {
    errors.push(...validateLens(lens, index));

    if (lens && typeof lens.id === 'string') {
      if (seenIds.has(lens.id)) {
        errors.push(`lens[${index}]: duplicate id "${lens.id}" (already used by lens[${seenIds.get(lens.id)}])`);
      } else {
        seenIds.set(lens.id, index);
      }
    }
  });

  if (errors.length > 0) {
    console.error(`\nData validation failed with ${errors.length} error(s):\n`);
    for (const error of errors) console.error(`  - ${error}`);
    console.error('');
    process.exit(1);
  }

  console.log(`Data validation passed: ${data.length} lenses, all IDs unique, all required fields and URLs valid.`);
}

main();
