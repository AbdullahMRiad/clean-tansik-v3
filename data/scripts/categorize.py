import pandas as pd
import re
import argparse

# Setup argument parser
parser = argparse.ArgumentParser(description='Categorize CSV data based on majors.')
parser.add_argument('input_csv', help='The path to the input CSV file.')
parser.add_argument('output_csv', help='The path for the output CSV file.')
args = parser.parse_args()

# Read the CSV
try:
    df = pd.read_csv(args.input_csv, encoding='utf-8')
except FileNotFoundError:
    print(f"Error: The file '{args.input_csv}' was not found.")
    exit()

# Standardize column names
cols = list(df.columns)
rename_map = {}
for c in cols:
    c_stripped = str(c).strip()
    if c_stripped == 'الكلية':
        rename_map[c] = 'الكلية'
    elif c_stripped in ['الدرجة', ' الحد الأدنى', 'الحد الأدنى', 'الحد الأدنى', ' الحد الأدنى']:
        rename_map[c] = 'الدرجة'

if rename_map:
    df = df.rename(columns=rename_map)

# Ensure only the two required columns exist for downstream logic
if 'الكلية' not in df.columns or 'الدرجة' not in df.columns:
    if 'الكلية' in df.columns and len(df.columns) >= 2:
        second_col = [c for c in df.columns if c != 'الكلية'][0]
        df = df.rename(columns={second_col: 'الدرجة'})

# Drop rows that are completely empty
df = df.dropna(how='all')

# Clean whitespace and convert 'الدرجة' to numeric
df['الكلية'] = df['الكلية'].astype(str).str.strip()
df['الدرجة'] = pd.to_numeric(df['الدرجة'], errors='coerce')

def classify_type(name):
    if 'انتساب موجه' in name:
        return 'انتساب'
    if 'معهد' in name or 'عالي' in name:
        return 'معهد'
    return 'جامعة'

major_map = [

    # Medical field
    ('طب أسنان|طب اسنان|اسنان', 'طب أسنان'),
    ('طب بيطري|بيطري', 'طب بيطري'),
    ('طب', 'طب'),
    ('صيدلة', 'صيدلة'),
    ('علاج طبيعي', 'علاج طبيعي'),
    ('تمريض', 'تمريض'),
    ('فني صحي|فنى صحى|فني صحى|فنى صحي', 'تمريض'),

    # Engineering
    ('بترول', 'هندسة بترول'),
    ('هندسة|هندسه|للهندسه|هندسية', 'هندسة'),
    ('تخطيط عمراني', 'تخطيط عمراني'),

    # Technology
    ('الملاحة وتكنولوجيا الفضاء', 'الملاحة والفضاء'),
    ('تكنولوجي|تكنولوجيا|تكنولوجى', 'تكنولوجيا'),

    # Computer and AI
    ('حاسبات وذكاء اصطناعي|ذكاء اصطناعي|الذكاء الاصطناعي|ذكاء إصطناعي|الذكاء الاصطناعى', 'حاسبات ومعلومات'),
    ('نظم معلومات|نظم المعلومات', 'حاسبات ومعلومات'),
    ('حاسبات ومعلومات|حاسبات|حاسب|معلومات', 'حاسبات ومعلومات'),

    # Sciences
    ('اقتصاد وعلوم سياسية', 'اقتصاد وعلوم سياسية'),
    ('علوم سياسية|سياسة|سياسى', 'علوم سياسية'),
    ('بيئة|بيئه', 'علوم بيئية'),
    ('كيمياء|كيميائ', 'علوم'),
    ('فيزياء', 'علوم'),
    ('احياء|أحياء|حيوان|نبات|جيولوجيا|بيولوجيا', 'علوم'),
    ('علوم', 'علوم'),
    ('رياضيات', 'رياضيات'),
    ('احصاء|إحصاء', 'إحصاء'),

    # Business
    ('تمويل|محاسبة|محاسبه|مالية', 'مالية ومحاسبة'),
    ('التجارة الخارجية|تجارة خارجية', 'تجارة'),
    ('تجارة|تجاره', 'تجارة'),
    ('ادارة اعمال|إدارة أعمال|إدارة الاعمال|اداره اعمال', 'إدارة أعمال'),
    ('إدارة|ادارة|إداره|اداره', 'إدارة'),
    ('اقتصاد', 'اقتصاد'),
    ('تسويق', 'تسويق'),

    # Other
    ('اعلام|إعلام', 'إعلام'),
    ('لغات وترجمة|ترجمة', 'ألسن'),
    ('السن|ألسن', 'ألسن'),
    ('آداب|اداب', 'آداب'),
    ('تربية', 'تربية'),
    ('حقوق', 'حقوق'),
    ('شريعة|شريعه|دراسات اسلامية|الدراسات الإسلامية|اسلامية', 'دراسات إسلامية'),
    ('آثار|اثار', 'آثار'),
    ('سياحة وفنادق|سياحه وفنادق|سياحة', 'سياحة وفنادق'),
    ('فنون تطبيقية', 'فنون تطبيقية'),
    ('فنون جميلة|فنون جميله', 'فنون جميلة'),
    ('تمثيل|سينما|مسرح', 'فنون مسرحية'),
    ('زراعة|زراعه', 'زراعة'),
    ('الطفولة|طفولة', 'تربية'),
    ('خدمة اجتماعية|الخدمة الاجتماعية', 'خدمة اجتماعية'),
    ('صناعي|صناعة|صناعى', 'صناعة'),
    ('الاعاقة والتأهيل', 'الإعاقة والتأهيل')
]

compiled_patterns = [(re.compile(k), v) for k, v in major_map]

def classify_major(name):
    text = str(name)
    for pat, tag in compiled_patterns:
        if pat.search(text):
            return tag
    return 'غير مصنف'

df['النوع'] = df['الكلية'].apply(classify_type)
df['المجال'] = df['الكلية'].apply(classify_major)

# Icon mapping for each major field
icon_map = {
    'طب': 'ecg',
    'طب أسنان': 'dentistry',
    'طب بيطري': 'pet_supplies',
    'صيدلة': 'syringe',
    'علاج طبيعي': 'accessibility_new',
    'تمريض': 'admin_meds',
    'هندسة': 'engineering',
    'هندسة بترول': 'oil_barrel',
    'تخطيط عمراني': 'location_city',
    'الملاحة والفضاء': 'rocket_launch',
    'تكنولوجيا': 'manufacturing',
    'حاسبات ومعلومات': 'data_object',
    'اقتصاد وعلوم سياسية': 'finance_mode',
    'علوم سياسية': 'gavel',
    'علوم بيئية': 'nature_people',
    'علوم': 'science',
    'رياضيات': 'calculate',
    'إحصاء': 'bar_chart_4_bars',
    'مالية ومحاسبة': 'payments',
    'تجارة': 'store',
    'إدارة أعمال': 'business_center',
    'إدارة': 'manage_accounts',
    'اقتصاد': 'query_stats',
    'تسويق': 'campaign',
    'إعلام': 'video_camera_front',
    'ألسن': 'translate',
    'آداب': 'book_2',
    'تربية': 'co_present',
    'حقوق': 'balance',
    'دراسات إسلامية': 'prayer_times',
    'آثار': 'museum',
    'سياحة وفنادق': 'hotel',
    'فنون تطبيقية': 'brush',
    'فنون جميلة': 'palette',
    'فنون مسرحية': 'theater_comedy',
    'زراعة': 'agriculture',
    'خدمة اجتماعية': 'volunteer_activism',
    'صناعة': 'factory',
    'الإعاقة والتأهيل': 'accessible_forward',
    'غير مصنف': 'block'
}

def get_icon(major):
    return icon_map.get(major, 'block')

df['الأيقونة'] = df['المجال'].apply(get_icon)

out_df = df[['الكلية', 'الدرجة', 'النوع', 'المجال', 'الأيقونة']]

try:
    out_df.to_csv(args.output_csv, index=False, encoding='utf-8')
    print(f"Wrote tagged file successfully to '{args.output_csv}'.")
except IOError:
    print(f"Error: Could not write to the file '{args.output_csv}'. Check permissions.")