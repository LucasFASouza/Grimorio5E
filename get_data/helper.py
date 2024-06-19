from bs4 import BeautifulSoup
import re
import json


def html_to_json(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    spells = soup.find_all('div', class_='spell-item')

    spells_list = []

    for spell in spells:
        description_container = spell.find('div', class_='description')

        description = ''
        material = None
        higher_level = None
        for child in description_container.children:
            if child.name == 'p':  
                child_text = re.sub(r'\s+', ' ', child.text).strip()

                if child_text.split(': ')[0] == 'Material':
                    material = child_text.split(': ')[1]
                elif child_text.split('.')[0] == 'Em Níveis Superiores':
                    higher_level = child_text.split('. ')[1]
                else:
                    if description != '':
                        description += '\n'

                    description += re.sub(r'\s+', ' ', child.text).strip()

            elif child.name == 'ul':
                for li in child.find_all('li'):
                    if description != '':
                        description += '\n'

                    description += '    - ' + re.sub(r'\s+', ' ', li.text).strip()

        spell_details = {
            'id': spell.attrs['data-name'],
            'level': int(spell.attrs['data-level']),
            'name': spell.find('div', class_='name').p.text.strip(),
            'school': spell.find('p', class_='school').text.strip().split(' ')[0],
            'casting_time': spell.find('img', src="img/cast.svg").find_next_sibling('div').text.strip(),
            'range': spell.find('img', src="img/range.svg").find_next_sibling('div').text.strip(),
            'components': [component.strip() for component in spell.find('img', src="img/components.svg").find_next_sibling('div').text.split(',')],
            'duration': spell.find('img', src="img/duration.svg").find_next_sibling('div').text.strip(),
            'description': description,
            'material': material,
            'higher_level': higher_level,
            'ritual': spell.find('img', src="img/ritual.svg") is not None,
            'concentration': spell.find('img', src="img/concentration.svg") is not None,
        }
        spells_list.append(spell_details)

    return json.dumps(spells_list, ensure_ascii=False)


# Example usage
with open('get_data/spells.html', 'r', encoding='utf-8') as file:
    html_content = file.read()
    json_output = html_to_json(html_content)

    with open('public/data/spell-details.json', 'w', encoding='utf-8') as json_file:
        json_file.write(json_output)
