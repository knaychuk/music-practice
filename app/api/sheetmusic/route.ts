import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import formidable from 'formidable';
import { IncomingMessage } from 'http';

export const dynamic = {
  api: {
    bodyParser: false, // Disable Next.js's default body parsing
  },
};

const parseForm = (req: IncomingMessage): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Convert Next.js request to IncomingMessage for formidable to work
    const incomingRequest = request as any; // Hack to make it compatible with IncomingMessage

    try {
      const { fields, files } = await parseForm(incomingRequest);
      
      // If you're sure you only expect single values, use this to cast fields to strings
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const composer = Array.isArray(fields.composer) ? fields.composer[0] : fields.composer;
      const arrangedBy = Array.isArray(fields.arrangedBy) ? fields.arrangedBy[0] : fields.arrangedBy;

      console.log('Title:', title);
      console.log('Composer:', composer);
      console.log('Arranged By:', arrangedBy);
      console.log('Files:', files);

      return NextResponse.json({ message: 'File uploaded successfully', fields, files });
    } catch (error) {
      return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}