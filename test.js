/**
 * Personal Brand & Beauty Academy
 * Playwright Test Suite
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runTests() {
    console.log('Starting website tests...\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    let allPassed = true;
    const errors = [];
    
    // Collect console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(`Console Error: ${msg.text()}`);
        }
    });
    
    page.on('pageerror', error => {
        errors.push(`Page Error: ${error.message}`);
    });
    
    const pages = [
        { name: 'Homepage', file: 'index.html' },
        { name: 'Services', file: 'services.html' },
        { name: 'Academy', file: 'academy.html' },
        { name: 'Consultation', file: 'consultation.html' }
    ];
    
    for (const pageInfo of pages) {
        console.log(`Testing ${pageInfo.name}...`);
        
        try {
            const filePath = path.join(__dirname, pageInfo.file);
            
            if (!fs.existsSync(filePath)) {
                console.log(`  ✗ ${pageInfo.name}: File not found`);
                allPassed = false;
                continue;
            }
            
            await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
            
            // Check if main elements are present
            const header = await page.$('.header');
            const main = await page.$('main');
            const footer = await page.$('.footer');
            
            if (!header) {
                console.log(`  ✗ ${pageInfo.name}: Header missing`);
                allPassed = false;
            }
            
            if (!main) {
                console.log(`  ✗ ${pageInfo.name}: Main content missing`);
                allPassed = false;
            }
            
            if (!footer) {
                console.log(`  ✗ ${pageInfo.name}: Footer missing`);
                allPassed = false;
            }
            
            // Check for page-specific elements
            if (pageInfo.file === 'index.html') {
                const hero = await page.$('.hero');
                if (!hero) {
                    console.log(`  ✗ ${pageInfo.name}: Hero section missing`);
                    allPassed = false;
                }
            }
            
            if (pageInfo.file === 'services.html') {
                const bookingForm = await page.$('#booking-form');
                if (!bookingForm) {
                    console.log(`  ✗ ${pageInfo.name}: Booking form missing`);
                    allPassed = false;
                }
            }
            
            if (pageInfo.file === 'academy.html') {
                const courseDetail = await page.$('.course-detail');
                if (!courseDetail) {
                    console.log(`  ✗ ${pageInfo.name}: Course details missing`);
                    allPassed = false;
                }
            }
            
            if (pageInfo.file === 'consultation.html') {
                const consultationCard = await page.$('.consultation-card');
                if (!consultationCard) {
                    console.log(`  ✗ ${pageInfo.name}: Consultation cards missing`);
                    allPassed = false;
                }
            }
            
            console.log(`  ✓ ${pageInfo.name}: Page loaded successfully`);
            
        } catch (error) {
            console.log(`  ✗ ${pageInfo.name}: Error - ${error.message}`);
            allPassed = false;
        }
    }
    
    // Test navigation functionality
    console.log('\nTesting navigation...');
    try {
        await page.goto(`file://${path.join(__dirname, 'index.html')}`, { waitUntil: 'networkidle' });
        
        // Test smooth scroll links
        const aboutLink = await page.$('a[href="#about"]');
        if (aboutLink) {
            await aboutLink.click();
            await page.waitForTimeout(500);
            console.log('  ✓ Navigation links working');
        }
        
    } catch (error) {
        console.log(`  ✗ Navigation test failed: ${error.message}`);
        allPassed = false;
    }
    
    // Test mobile menu
    console.log('\nTesting mobile menu...');
    try {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`file://${path.join(__dirname, 'index.html')}`, { waitUntil: 'networkidle' });
        
        const navToggle = await page.$('#nav-toggle');
        if (navToggle) {
            await navToggle.click();
            await page.waitForTimeout(300);
            console.log('  ✓ Mobile menu toggle working');
        }
        
        await page.setViewportSize({ width: 1920, height: 1080 });
        
    } catch (error) {
        console.log(`  ✗ Mobile menu test failed: ${error.message}`);
        allPassed = false;
    }
    
    // Report console errors
    if (errors.length > 0) {
        console.log('\nConsole Errors Found:');
        errors.forEach(error => console.log(`  - ${error}`));
        allPassed = false;
    } else {
        console.log('\n✓ No console errors found');
    }
    
    await browser.close();
    
    console.log('\n' + '='.repeat(50));
    if (allPassed) {
        console.log('✓ All tests passed!');
        process.exit(0);
    } else {
        console.log('✗ Some tests failed. Please review the errors above.');
        process.exit(1);
    }
}

runTests().catch(error => {
    console.error('Test suite error:', error);
    process.exit(1);
});
