import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { babyName, ageMonths, jaundicePresent, dactylitisPresent, familyScdHistory, regionalHospital } = body;

    // Sickle Cell Disease Risk Stratification Logic
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (jaundicePresent && dactylitisPresent) {
      riskLevel = 'HIGH';
    } else if (jaundicePresent || dactylitisPresent || familyScdHistory) {
      riskLevel = 'MEDIUM';
    }

    return NextResponse.json({
      success: true,
      data: {
        babyName,
        riskLevel,
        recommendedAction: riskLevel === 'HIGH' ? 'Immediate HPLC / Electrophoresis test required at regional facility.' : 'Routine neonatal follow-up scheduled.',
        assignedHospital: regionalHospital || 'Korle Bu Teaching Hospital'
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process screening' }, { status: 400 });
  }
}
