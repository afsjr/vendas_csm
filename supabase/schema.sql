-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  status VARCHAR(50) DEFAULT 'prospecto',
  last_contact TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_contact TIMESTAMP WITH TIME ZONE,
  educational_background VARCHAR(255) NOT NULL,
  interest_areas TEXT[] DEFAULT '{}',
  preferred_course_types TEXT[] DEFAULT '{}',
  preferred_format TEXT[] DEFAULT '{}',
  notes TEXT DEFAULT '',
  total_value DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  format VARCHAR(50) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  enrollment_deadline DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matriculations table
CREATE TABLE IF NOT EXISTS matriculations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  student_name VARCHAR(255) NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  course_name VARCHAR(255) NOT NULL,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'ativa',
  payment_status VARCHAR(50) DEFAULT 'pendente',
  guarantor_name VARCHAR(255),
  guarantor_relationship VARCHAR(100),
  guarantor_phone VARCHAR(20),
  guarantor_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  matriculation_id UUID REFERENCES matriculations(id) ON DELETE CASCADE,
  student_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  student_name VARCHAR(255) NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  course_name VARCHAR(255) NOT NULL,
  subject_name VARCHAR(255) NOT NULL,
  period VARCHAR(20) NOT NULL,
  grade DECIMAL(4,2) NOT NULL,
  max_grade DECIMAL(4,2) DEFAULT 10,
  status VARCHAR(50) DEFAULT 'em_andamento',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_matriculations_student_id ON matriculations(student_id);
CREATE INDEX IF NOT EXISTS idx_matriculations_course_id ON matriculations(course_id);
CREATE INDEX IF NOT EXISTS idx_grades_matriculation_id ON grades(matriculation_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_matriculations_updated_at BEFORE UPDATE ON matriculations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO courses (id, name, level, format, duration, price, start_date, enrollment_deadline, description) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Análise e Desenvolvimento de Sistemas', 'graduacao', 'hibrido', '2.5 anos', 18000.00, '2024-03-01', '2024-02-15', 'Curso superior de tecnologia'),
('550e8400-e29b-41d4-a716-446655440002', 'MBA em Gestão de Projetos', 'pos', 'online', '1.5 anos', 24000.00, '2024-04-10', '2024-03-25', 'Pós-graduação em gestão'),
('550e8400-e29b-41d4-a716-446655440003', 'Técnico em Enfermagem', 'tecnico', 'presencial', '2 anos', 12000.00, '2024-02-15', '2024-01-30', 'Curso técnico na área de saúde'),
('550e8400-e29b-41d4-a716-446655440004', 'Especialização em Marketing Digital', 'especializacao', 'online', '8 meses', 8500.00, '2024-03-05', '2024-02-20', 'Especialização em marketing'),
('550e8400-e29b-41d4-a716-446655440005', 'Excel Avançado e VBA', 'profissionalizante', 'online', '3 meses', 1200.00, '2024-02-01', '2024-01-25', 'Curso profissionalizante');

INSERT INTO leads (id, name, email, phone, status, educational_background, interest_areas, preferred_course_types, preferred_format, notes, total_value) VALUES
('550e8400-e29b-41d4-a716-446655440011', 'Maria Silva', 'maria.silva@email.com', '(11) 99999-9999', 'interessado', 'Ensino Médio Completo', '{"Tecnologia", "Programação"}', '{"graduacao", "tecnico"}', '{"hibrido", "online"}', 'Interessada em cursos de tecnologia', 0),
('550e8400-e29b-41d4-a716-446655440012', 'João Santos', 'joao.santos@email.com', '(21) 88888-8888', 'matriculado', 'Graduação em Administração', '{"Gestão", "Projetos"}', '{"pos", "especializacao"}', '{"online"}', 'Busca especialização para crescimento', 24000),
('550e8400-e29b-41d4-a716-446655440013', 'Ana Costa', 'ana.costa@email.com', '(31) 77777-7777', 'contatado', 'Ensino Médio Completo', '{"Saúde", "Enfermagem"}', '{"tecnico"}', '{"presencial"}', 'Primeira formação na área de saúde', 0),
('550e8400-e29b-41d4-a716-446655440014', 'Carlos Oliveira', 'carlos.oliveira@email.com', '(41) 66666-6666', 'prospecto', 'Graduação em Marketing', '{"Marketing Digital", "SEO"}', '{"especializacao"}', '{"online"}', 'Busca atualização em marketing digital', 0),
('550e8400-e29b-41d4-a716-446655440015', 'Fernanda Lima', 'fernanda.lima@email.com', '(51) 55555-5555', 'desistente', 'Ensino Médio Completo', '{"Administração", "Excel"}', '{"profissionalizante"}', '{"online"}', 'Desistiu por questões financeiras', 0);
