const checker = require('./index');

console.log('--- Testing checkInteraction ---');
const interaction = checker.checkInteraction('Acetaminophen', 'Warfarin');
if (interaction) {
  console.log('✅ Found interaction between Acetaminophen and Warfarin:');
  console.log('  ', interaction.description);
} else {
  console.error('❌ Failed to find expected interaction.');
  process.exit(1);
}

console.log('\n--- Testing case insensitivity ---');
const caseInsensitive = checker.checkInteraction('acetaminophen', 'WARFARIN');
if (caseInsensitive) {
  console.log('✅ Found interaction ignoring case.');
} else {
  console.error('❌ Failed case insensitivity test.');
  process.exit(1);
}

console.log('\n--- Testing getInteractions ---');
const allAspirin = checker.getInteractions('Aspirin');
if (allAspirin.length > 0) {
  console.log(`✅ Found ${allAspirin.length} interactions for Aspirin.`);
} else {
  console.error('❌ Failed to find interactions for Aspirin.');
  process.exit(1);
}

console.log('\n--- Testing nonexistent interaction ---');
const none = checker.checkInteraction('Aspirin', 'Water');
if (!none) {
  console.log('✅ Correctly handled nonexistent interaction.');
} else {
  console.error('❌ Found interaction for something that should not exist.');
  process.exit(1);
}

console.log('\nAll tests passed! 🎉');
