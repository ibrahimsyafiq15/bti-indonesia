const express = require('express');
const router = express.Router();
const { query } = require('../config/db');
const upload = require('../middleware/upload');

// Get company details (public)
router.get('/public', async (req, res) => {
  try {
    const [company] = await query('SELECT * FROM company_settings WHERE id = 1');
    
    if (!company) {
      // Return default if not set
      return res.json({
        name: 'Barakah Talenta Inspirasi',
        description: 'A trusted strategic partner enabling organizations to make confident and impactful business.',
        metaDescription: '',
        address: { street: '', city: 'Jakarta', country: 'Indonesia', fullAddress: 'Jakarta, Indonesia' },
        contact: { email: 'contact@bti.co.id', phone: '+62 812 3456 7890', whatsapp: '6281234567890' },
        socialMedia: { instagram: '', linkedin: '', youtube: '', tiktok: '', twitter: '' },
        logo: '/logo.png',
        footerLogo: '/logo-footer.png'
      });
    }

    // Format response
    res.json({
      name: company.name,
      description: company.description,
      metaDescription: company.meta_description,
      address: {
        street: company.address_street,
        city: company.address_city,
        country: company.address_country,
        fullAddress: company.address_full
      },
      contact: {
        email: company.contact_email,
        phone: company.contact_phone,
        whatsapp: company.contact_whatsapp
      },
      socialMedia: {
        instagram: company.social_instagram,
        linkedin: company.social_linkedin,
        youtube: company.social_youtube,
        tiktok: company.social_tiktok,
        twitter: company.social_twitter
      },
      logo: company.logo,
      footerLogo: company.footer_logo
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get company details (admin)
router.get('/', async (req, res) => {
  try {
    const [company] = await query('SELECT * FROM company_settings WHERE id = 1');
    
    if (!company) {
      return res.json({
        name: 'Barakah Talenta Inspirasi',
        description: 'A trusted strategic partner enabling organizations to make confident and impactful business.',
        metaDescription: '',
        address: { street: '', city: 'Jakarta', country: 'Indonesia', fullAddress: 'Jakarta, Indonesia' },
        contact: { email: 'contact@bti.co.id', phone: '+62 812 3456 7890', whatsapp: '6281234567890' },
        socialMedia: { instagram: '', linkedin: '', youtube: '', tiktok: '', twitter: '' },
        logo: '/logo.png',
        footerLogo: '/logo-footer.png'
      });
    }

    res.json({
      name: company.name,
      description: company.description,
      metaDescription: company.meta_description,
      address: {
        street: company.address_street,
        city: company.address_city,
        country: company.address_country,
        fullAddress: company.address_full
      },
      contact: {
        email: company.contact_email,
        phone: company.contact_phone,
        whatsapp: company.contact_whatsapp
      },
      socialMedia: {
        instagram: company.social_instagram,
        linkedin: company.social_linkedin,
        youtube: company.social_youtube,
        tiktok: company.social_tiktok,
        twitter: company.social_twitter
      },
      logo: company.logo,
      footerLogo: company.footer_logo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update company details
router.put('/', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'footerLogo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, description, metaDescription } = req.body;
    const address = req.body.address ? JSON.parse(req.body.address) : {};
    const contact = req.body.contact ? JSON.parse(req.body.contact) : {};
    const socialMedia = req.body.socialMedia ? JSON.parse(req.body.socialMedia) : {};

    let logo = null;
    let footerLogo = null;

    if (req.files) {
      if (req.files.logo) {
        logo = `/uploads/${req.files.logo[0].filename}`;
      }
      if (req.files.footerLogo) {
        footerLogo = `/uploads/${req.files.footerLogo[0].filename}`;
      }
    }

    // Build update query
    let updateFields = [];
    let values = [];

    if (name) { updateFields.push('name = ?'); values.push(name); }
    if (description) { updateFields.push('description = ?'); values.push(description); }
    if (metaDescription !== undefined) { updateFields.push('meta_description = ?'); values.push(metaDescription); }
    
    if (address.street !== undefined) { updateFields.push('address_street = ?'); values.push(address.street); }
    if (address.city) { updateFields.push('address_city = ?'); values.push(address.city); }
    if (address.country) { updateFields.push('address_country = ?'); values.push(address.country); }
    if (address.fullAddress) { updateFields.push('address_full = ?'); values.push(address.fullAddress); }
    
    if (contact.email) { updateFields.push('contact_email = ?'); values.push(contact.email); }
    if (contact.phone) { updateFields.push('contact_phone = ?'); values.push(contact.phone); }
    if (contact.whatsapp) { updateFields.push('contact_whatsapp = ?'); values.push(contact.whatsapp); }
    
    if (socialMedia.instagram !== undefined) { updateFields.push('social_instagram = ?'); values.push(socialMedia.instagram); }
    if (socialMedia.linkedin !== undefined) { updateFields.push('social_linkedin = ?'); values.push(socialMedia.linkedin); }
    if (socialMedia.youtube !== undefined) { updateFields.push('social_youtube = ?'); values.push(socialMedia.youtube); }
    if (socialMedia.tiktok !== undefined) { updateFields.push('social_tiktok = ?'); values.push(socialMedia.tiktok); }
    if (socialMedia.twitter !== undefined) { updateFields.push('social_twitter = ?'); values.push(socialMedia.twitter); }
    
    if (logo) { updateFields.push('logo = ?'); values.push(logo); }
    if (footerLogo) { updateFields.push('footer_logo = ?'); values.push(footerLogo); }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    values.push(1); // id = 1

    await query(
      `UPDATE company_settings SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    // Return updated company
    const [updated] = await query('SELECT * FROM company_settings WHERE id = 1');
    
    res.json({
      name: updated.name,
      description: updated.description,
      metaDescription: updated.meta_description,
      address: {
        street: updated.address_street,
        city: updated.address_city,
        country: updated.address_country,
        fullAddress: updated.address_full
      },
      contact: {
        email: updated.contact_email,
        phone: updated.contact_phone,
        whatsapp: updated.contact_whatsapp
      },
      socialMedia: {
        instagram: updated.social_instagram,
        linkedin: updated.social_linkedin,
        youtube: updated.social_youtube,
        tiktok: updated.social_tiktok,
        twitter: updated.social_twitter
      },
      logo: updated.logo,
      footerLogo: updated.footer_logo
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
