import paramiko
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('94.72.97.249', username='diego', password='Rsjwvb12_', port=22, timeout=10, allow_agent=False, look_for_keys=False)
stdin, stdout, stderr = client.exec_command('whoami')
print(stdout.read().decode())
