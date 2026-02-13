const { query, transaction } = require('./config/db');

async function seedTeam() {
  try {
    console.log('Checking team members...');
    
    // Clear existing team members and re-seed
    console.log('Clearing existing team members...');
    await query('DELETE FROM team_credentials');
    await query('DELETE FROM team_expertise');
    await query('DELETE FROM team_members');

    console.log('Seeding team members...');

    const teamMembers = [
      {
        name: 'Banto Twiseno',
        title: 'Insight Expert',
        profile_description: 'A market research and insight expert with 25 years of experience in Unilever. He has proven milestones in transforming insights into actions across multiple countries and categories, from innovation and communication to shopper and Muslim insights. He is a seasoned partner for senior leadership in making business decisions to build brands, products, and services.',
        linkedin_profile: 'https://www.linkedin.com/in/banto-twiseno-ba5b4041/',
        photo: '/team-banto.jpg',
        sort_order: 1,
        is_active: true,
        expertise: ['Market Research', 'Consumer Insights', 'Brand Strategy', 'Facilitation & Mentoring'],
        credentials: [
          { icon: 'fas fa-lightbulb', label: 'Insight Specialist' },
          { icon: 'fas fa-briefcase', label: '25+ Years Experience' },
          { icon: 'fas fa-building', label: 'Former Unilever Executive' }
        ]
      },
      {
        name: 'Tutus Widayanti',
        title: 'Corporate Transformation & Change Management',
        profile_description: 'A cross-functional professional with more than 25 years of experience in multinational corporations and consulting. Her background spans marketing, sales, customer operations, HR, and transformation at organizations such as HM Sampoerna, Unilever, Prudential, and SHL Indonesia. She specializes in bridging strategic direction with shifts in ways of working and culture to ensure practical and sustainable transformation.',
        linkedin_profile: 'https://www.linkedin.com/in/tutus-widayanti/',
        photo: '/team-tutus.jpg',
        sort_order: 2,
        is_active: true,
        expertise: ['Change Management', 'Culture & Capability', 'Strategic Initiative Design', 'Business Process Improvement'],
        credentials: [
          { icon: 'fas fa-sync-alt', label: 'Transformation Expert' },
          { icon: 'fas fa-briefcase', label: '25+ Years Experience' },
          { icon: 'fas fa-certificate', label: 'SHL Indonesia Alumni' }
        ]
      },
      {
        name: 'Putri Novelia',
        title: 'Organizational & People Advisor',
        profile_description: 'A psychologist and organization development specialist with experience across industrial manufacturing, energy, and professional services. Her work centers on designing organization structures, managing talent pipelines, and equipping leaders with the tools to lead effectively. She integrates data-driven insights with practical interventions to build resilient, high-performing teams.',
        linkedin_profile: 'https://www.linkedin.com/in/putri-novelia-sukmadilaga-99a04925/',
        photo: '/team-putri.jpg',
        sort_order: 3,
        is_active: true,
        expertise: ['Organization Design', 'Leadership Development', 'Talent Management', 'Strategic Workforce Planning'],
        credentials: [
          { icon: 'fas fa-users-cog', label: 'Organization Development' },
          { icon: 'fas fa-graduation-cap', label: 'Psychologist' },
          { icon: 'fas fa-chart-line', label: 'Talent Strategist' }
        ]
      }
    ];

    for (const member of teamMembers) {
      await transaction(async (conn) => {
        // Insert member
        const [memberResult] = await conn.execute(
          `INSERT INTO team_members (name, title, profile_description, linkedin_profile, photo, sort_order, is_active) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [member.name, member.title, member.profile_description, member.linkedin_profile, member.photo, member.sort_order, member.is_active]
        );

        const memberId = memberResult.insertId;

        // Insert expertise
        for (const exp of member.expertise) {
          await conn.execute(
            'INSERT INTO team_expertise (team_id, expertise) VALUES (?, ?)',
            [memberId, exp]
          );
        }

        // Insert credentials
        for (const cred of member.credentials) {
          await conn.execute(
            'INSERT INTO team_credentials (team_id, icon, label) VALUES (?, ?, ?)',
            [memberId, cred.icon, cred.label]
          );
        }

        console.log(`✅ Added team member: ${member.name}`);
      });
    }

    console.log('✅ Team members seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding team:', error);
    process.exit(1);
  }
}

seedTeam();
